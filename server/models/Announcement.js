const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Assignment", "Other", "Announcement"],
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  attachments: {
    type: {
      name: {
        type: String,
      },
      originalName: {
        type: String,
      },
    },
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: {
    type: [
      {
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  submissions: {
    type: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        attachment: {
          type: {
            name: {
              type: String,
              required: true,
            },
            originalName: {
              type: String,
              required: true,
            },
          },
        },
      },
    ],
  },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
module.exports = Announcement;
