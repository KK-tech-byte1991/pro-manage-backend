const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const affiliated = new Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const boardSchema = new Schema({
    owner: {
        type: String,
        required: true
    },

    affiliation: [affiliated],


});

module.exports = mongoose.model("Board", boardSchema);

