const mongoose = require("mongoose");
/**
 * Creating todo schema and model.
 */
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  uid: { type: String },
  date: { type: Date, default: new Date() }
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
