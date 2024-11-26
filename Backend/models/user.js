const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, requried: true},
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    gender: {
        type: String,
        enum: ["male", "female", "prefer not to say"],
        required: true,
    },
    refreshToken: String
}, {timestamp: true});

module.exports = mongoose.model("User", userSchema);