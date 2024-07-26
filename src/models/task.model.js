const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    task: { type: String, required: false },
    isClosed: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true, autopopulate: true }, 
    subTasks: [{ type: Schema.Types.ObjectId, ref: "subtasks",  autopopulate: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comment",  autopopulate: true }]
});


TaskSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("task", TaskSchema)