const Article =require('../models/articles') 

//show my articles
const index = async (req, res) => {

    const articles = await Article.find({

        author: req.session.user._id
    })

    res.render('articles/index.ejs',{
        title: "Articles",
        articles
    })
}

const createArticle = async (req, res) => {

    const article = await Article.create({
        
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        author: req.session.user._id
    });

    res.redirect(`/articles/${article._id}`);
};



const newArticle = async (req, res) => {

    res.render('articles/new.ejs',{
        title:"New Articles"
    })
};


const show = async (req, res) => {

    const article = await Article.findById(req.params.articleId)

    res.render('articles/show.ejs', {
        title:"Show Article",
        article
    });
};


const edit = async(req, res) =>{

     const article = await Article.findById(req.params.articleId)

    res.render('articles/edit.ejs', {
        title:"Edit Article",
        article
    });
}


const update = async (req, res) => {

    const article = await Article.findById(req.params.articleId)

    article.title = req.body.title
    article.category = req.body.category
    article.content = req.body.content

    await article.save()

    res.redirect(`/articles/${article._id}`)
}


const deleteArticle = async (req, res) => {

    await Article.findByIdAndDelete(req.params.articleId)

    res.redirect('/articles')
}




module.exports = {

    index,
    createArticle,
    newArticle,
    show,
    edit,
    update,
    deleteArticle,


}