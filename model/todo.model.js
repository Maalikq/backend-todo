
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  taskname: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ["pending", "done"],
      message: `{values} is not supported "pending"or "done" `
    },
  },
  tag: {
    type: String,
    enum: {
      values: ["personal", "office", "family"],
      message: `{values} is not supported provide "personal"or "office"or "family" `
    }
    },
  userID:{type: String}
}, { versionKey: false }
);

const TodoModel = mongoose.model("Todo",todoSchema)

module.exports = { TodoModel };

