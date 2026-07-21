const Article =require('../models/articles') 


const index = async (req, res) => {

    const articles = await Article.find({

        author: req.session.user._id
    })

    res.render('articles/index.ejs',{

        articles
    })
}

const createArticle = async (req, res) => {

    const article = await Article.create({

     title:req.body.title,
     category:req.body.category,
     content:req.body.content,
     author:req.session.user._id
    
    })



}










module.exports = {


}