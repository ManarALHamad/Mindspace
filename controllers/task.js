
const List =require('../models/lists') 



const newTask = async(req, res) => {

    const list = await List.findById(req.params.listId);

    res.render('tasks/newTask.ejs', {
        list
    });
}

const createTask = async(req, res) => {

    const foundList = await List.findById(req.params.listId);

    const taskData ={}
    
    taskData.title = req.body.title;
    taskData.description = req.body.description;
    taskData.dueDate = req.body.dueDate;

    foundList.tasks.push(taskData)

    
    await foundList.save()
    
     res.redirect(`/lists/${req.params.listId}/tasks/new`);
   


}





module.exports ={
    newTask,
    createTask,
}