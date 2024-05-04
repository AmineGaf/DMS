const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    },
    TaskDetails: [{
        detailName: {
            type: String,
            required: true
        },
        detailestimationDate: {
            type: Date,
            required: true
        },
        detailDescription: {
            type: String,
            required: true
        },
        detailStatus: {
            type: String,
            required: true
        }
        
    }]

})

module.exports = mongoose.model('task', taskSchema);