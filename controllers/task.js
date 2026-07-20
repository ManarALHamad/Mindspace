
const List =require('../models/lists') 



const newTask = (req, res) => {

    res.render('tasks/newTask.ejs',{
        listId: req.params.listId
    })
}

module.exports ={
    newTask,
}