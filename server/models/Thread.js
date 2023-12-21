const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {  
    type: String,
    required: false,
  },
  content: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        attachments: {
          type: [
            {
              type: String,
              required: true,
            },
          ],
          default: [],
        },
      },
    ],
  },
});
const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;
