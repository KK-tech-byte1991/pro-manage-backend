const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toDoSchema = new Schema({
    toDoName: {
        type: String,
        required: true
    },
    toDoPriority: {
        type: Number,
        required: true,
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("ToDos", toDoSchema);

