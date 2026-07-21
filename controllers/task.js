
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

const deleteTask = async (req, res) => {

    const foundList = await List.findById(req.params.listId);

    foundList.tasks.id(req.params.taskId).deleteOne();

    await foundList.save();

    res.redirect(`/lists/${req.params.listId}`);
}

const edit = async (req, res) => {

    const foundList = await List.findById(req.params.listId);

    const foundTask = foundList.tasks.id(req.params.taskId)

    await foundList.save();

    res.render('tasks/editTask.ejs', {
        list: foundList,
        task: foundTask
    })


}

const update = async (req, res) => {

    const foundList = await List.findById(req.params.listId);

    const foundTask = foundList.tasks.id(req.params.taskId);

    foundTask.title = req.body.title;
    foundTask.description = req.body.description;
    foundTask.dueDate = req.body.dueDate;

    await foundList.save();

    res.redirect(`/lists/${req.params.listId}`);
}






module.exports ={
    newTask,
    createTask,
    deleteTask,
    edit,
    update,
}