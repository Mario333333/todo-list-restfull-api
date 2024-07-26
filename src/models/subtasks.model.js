const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubtasksSchema = new Schema({
    subtask: { type: String, required: true },
    isClosed: { type: Boolean,  default: false  },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true, autopopulate: true }, // tipo id 
    
});

SubtasksSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("subtasks", SubtasksSchema)