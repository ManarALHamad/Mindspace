const mongoose = require('mongoose')

//title, description, isCompleted, dueDate, owner 
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

    owner: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task