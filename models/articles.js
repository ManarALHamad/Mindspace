const mongoose = require('mongoose')

//articles schema 

const articleSchema = new mongoose.Schema ({


title: {

    type: String,
    required: true,

    },

category: {

    type: String,
    enum:['health','beauty', 'school', 'career', 'friendships', 'finance','travel'],
    required: true,

    },


content: {
    type: String,
    required: true,

    },

author:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

},


}, {timestamps: true})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
