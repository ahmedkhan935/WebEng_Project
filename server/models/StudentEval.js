const mongoose = require("mongoose");

const StudentEvalSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  classCode: {
    type: String,
    required: true,
  },
  evaluations: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        obtainedMarks: {
          type: Number,
          required: true,
        },
        obtainedWeightage: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  lectures: {
    type: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        duration: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: "P",
        },
      },
    ],
  },
  totalObtainedAbs: {
    type: Number,
    required: true,
    default: 0,
  },
  grade: {
    type: String,
    required: true,
    default: "I",
  },
  attendance: {
    type: Number,
    required: true,
    default: 100,
  },
  feedback: {
    type: String,
    default: "",
  },
});

const StudentEval = mongoose.model("StudentEval", StudentEvalSchema);
module.exports = StudentEval;
