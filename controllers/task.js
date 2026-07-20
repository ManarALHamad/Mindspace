
const List =require('../models/lists') 



const newTask = async(req, res) => {

    const list = await List.findById(req.params.listId);

    res.render('tasks/newTask.ejs', {
        listId: req.params.listId
    });
}

const createTask = async(req, res) => {

    const list = await List.findById(req.params.listId);

    list.tasks.push({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });

    await list.save();

    res.redirect(`/lists/${list._id}`);


}





module.exports ={
    newTask,
    createTask,
}