const Task =require('../models/task') 


const newList = (req,res) =>{

    res.render('lists/new.ejs')
}

module.exports = {
    newList,
}