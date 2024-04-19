const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    TaskName: {
        type: String,
        required: true
    },
    ProjectName: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    ResponsibleUser: {
        type: String,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('task', taskSchema);