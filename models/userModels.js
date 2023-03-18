const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    id: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
});

userSchema.pre("save", function (next) {
    this.id = uuidv4();
    next();
});

module.exports = mongoose.model("User", userSchema);