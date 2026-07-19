const Task =require('../models/task') 


const newList = (req, res) =>{

    res.render('lists/new.ejs')
}



const show = (req, res) => {

    res.render('lists')
}

module.exports = {
    newList,
    show,
}