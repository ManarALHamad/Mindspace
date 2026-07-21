const mongoose = require('mongoose')

//articles schema 

const articleSchema = new mongoose.Schema ({


title: {

    type: String,
    required: true,

    },

content: {
    type: String,
    required: true,

    },


}, {timestamps: true})