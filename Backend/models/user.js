const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, requried: ture},
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    gender: {
        type: String,
        enum: ["male", "female", "prefer not to say"],
        require: true,
    },
    refreshToken: String
}, {timestamp: true});

module.exports = mongoose.Model("User", userSchema);