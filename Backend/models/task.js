const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    description: {type: String},
    dueDate: {type: Date, required: true},
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        require: true,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamp: true});

module.exports = mongoose.Model("Task", taskSchema);