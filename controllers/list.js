const List =require('../models/lists') 

//show all the lists

const index = async(req, res) => {

    const lists = await List.find({
        author: req.session.user._id
    })

    res.render('lists/index.ejs', {
        title:"All Lists",
        lists
    })


}

const createList = async (req, res) => {

   const list = await List.create({

    title: req.body.title,
    author: req.session.user._id
   })

    res.redirect(`/lists/${list._id}/tasks/new`)

}

const newList = async (req, res) =>{

    res.render('lists/new.ejs', {
        title:"Create To-Do List"
    })
}

//show list name with tasks
const show = async (req, res) => {

    const list = await List.findById(req.params.listId)
    
    res.render('lists/show.ejs', {
        title:"Show Lists",
        list,
    })
}

const deleteList = async (req, res) => {

    await List.findByIdAndDelete(req.params.listId)

    res.redirect('/lists')
}


module.exports = {
    index,
    newList,
    createList,
    show,
    deleteList,
    
}

// first create list, press enter - make list in database and render add task page (form) (done)
// add task page - if tasks exist, forEach and display each task, otherwise display no tasks yet
// click add task - edits the list to add the task; redirects back to add task page