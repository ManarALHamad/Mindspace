const List =require('../models/lists') 


const createList = async (req, res) => {

   const list = await List.create({

    title: req.body.title,
    author: req.session.user._id
   })

   res.redirect(`/lists/${list._id}/tasks/new`)
}



const newList = (req, res) =>{

    res.render('lists/new.ejs')
}

const show = async(req, res) => {

    const list = await List.findById(req.params.listId)

    res.render('lists/show.ejs', {
        list,
    })
}


module.exports = {
    newList,
    createList,
    show,
}

// first create list, press enter - make list in database and render add task page (form)
// add task page - if tasks exist, forEach and display each task, otherwise display no tasks yet
// click add task - edits the list to add the task; redirects back to add task page