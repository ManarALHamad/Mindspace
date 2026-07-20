const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema ({

    title: {

        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,

    },

    isCompleted:{

        type: Boolean
    },

    dueDate:{

        type: Date
    },


}, {timestamps: true})


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

   
    tasks: [taskSchema],


}, {timestamps: true})

const List = mongoose.model('List', listSchema)

module.exports = List