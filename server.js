const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session')
const { MongoStore } = require('connect-mongo')

const authCtrl = require('./controllers/auth')
const listCtrl =require('./controllers/list')
const taskCtrl =require('./controllers/task')

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.🥭`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))

app.get('/', (req, res) => {
    res.render('home.ejs', {
        user: req.session.user,
    })
})

app.get('/auth/sign-up', authCtrl.showSignUpForm )
app.post('/auth/sign-up', authCtrl.signUp)
app.get('/auth/sign-in', authCtrl.showSignInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.delete('/auth/sign-out', authCtrl.signOut)

//to do list name
app.get('/lists', listCtrl.index)
app.get('/lists/new', listCtrl.newList)
app.post('/lists', listCtrl.createList)
app.get('/lists/:listId', listCtrl.show)
app.delete('/lists/:listId', listCtrl.deleteList)



//tasks
app.get('/lists/:listId/tasks/new', taskCtrl.newTask)
app.post('/lists/:listId/tasks', taskCtrl.createTask)
app.delete('/lists/:listId/tasks/:taskId', taskCtrl.deleteTask)
app.get('/lists/:listId/tasks/:taskId/edit', taskCtrl.edit)
app.put('/lists/:listId/tasks/:taskId', taskCtrl.update)

app.get('/dashboard', async (req, res) => {
    if (!req.session.user){
        return res.redirect('/auth/sign-in')
    }
    res.render('dashboard.ejs', {
        user: req.session.user
    })
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});