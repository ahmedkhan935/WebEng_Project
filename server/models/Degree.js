const mongoose = require("mongoose");

const DegreeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true,
  },
  semCourses: {
    type: [
      {
        semNumber: {
          type: Number,
        },
        courses: [
          {
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
          },
        ],
      },
    ],
  },
  totalCredits: {
    type: Number,
  },
  totalSemesters: {
    type: Number,
  },
});
const Degree = mongoose.model("Degree", DegreeSchema);
module.exports = Degree;
