const mongoose = require('mongoose')


const listSchema = new mongoose.Schema({

    title: {

        type: String,
        required: true,
    },

    author: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

    tasks: [{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",

    }]




})