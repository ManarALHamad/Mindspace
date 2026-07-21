const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path')

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session')
const { MongoStore } = require('connect-mongo')

const authCtrl = require('./controllers/auth')
const listCtrl =require('./controllers/list')
const taskCtrl =require('./controllers/task')
const articleCtrl=require('./controllers/article')


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.🥭`);
});

app.use(express.static(path.join(__dirname, "public")))
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

    const quotes = [
        "Sometimes good things fall apart so better things can fall together.",
        "Small steps every day lead to big results.",
        "Progress, not perfection.",
        "Your future is created by what you do today.",
        "Dream big. Start small. Act now.",
        "Believe you can and you're halfway there.",
        "Success is the sum of small efforts repeated daily.",
        "The best time to start was yesterday. The next best time is today."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    res.render('home.ejs', {
        user: req.session.user,
        quote: randomQuote
    });
});

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
app.put('/lists/:listId/tasks/:taskId/complete', taskCtrl.toggleComplete)

//articles
// Articles
app.get('/articles', articleCtrl.index);
app.get('/articles/new', articleCtrl.newArticle);
app.post('/articles', articleCtrl.createArticle);
app.get('/articles/:articleId', articleCtrl.show);
app.get('/articles/:articleId/edit', articleCtrl.edit);
app.put('/articles/:articleId', articleCtrl.update);
app.delete('/articles/:articleId', articleCtrl.deleteArticle);

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