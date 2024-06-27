const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkList = new Schema({
    title: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        required: true
    }
})

const toDoSchema = new Schema({
    toDoName: {
        type: String,
        required: true
    },
    toDoPriority: {
        type: String,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    checkLists: [checkList],
    

});

module.exports = mongoose.model("ToDos", toDoSchema);

