const mongoose = require("mongoose");

const genders = ["h", "f"];

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    data: {
        gender: {
            type: String,
            default: genders[0],
            enum: genders
        },
        dateOfBirth: {
            type: String,
            default: null
        },
        creationDate: {
            type: Number,
            default: Date.now()
        }
    },
});


module.exports = mongoose.model("example", exampleSchema);