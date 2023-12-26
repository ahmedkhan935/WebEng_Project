const mongoose = require("mongoose");

//Student Schema
const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true, default: "" },
  password: String,
  name: String,
  rollNumber: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
  degreeName: { type: String, default: "" },
  CNIC: { type: String, unique: false, sparse: true }, //sparse: true means that the field is not required
  contactNumber: { type: String, unique: true, sparse: true },
  address: { type: String, default: "" },

  semesters: {
    //Semester array For students
    type: [
      {
        semesterNumber: {
          type: Number,
          default: 1,
        },
        //Structure of each object in semesters array
        semesterId: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" }, //Id of the semester as foreign key
        totalAttempted: { type: Number, default: 0 }, //Total credits attempted in this semester
        totalEarned: { type: Number, default: 0 }, //Total credits earned in this semester
        sgpa: { type: Number, default: 0.0 }, //GPA of this semester
        cgpa: { type: Number, default: 0.0 }, //CGPA till this semester

        courses: {
          //Courses array for each semester
          type: [
            {
              courseCode: { type: String, default: "" }, //Course code of the course
            },
          ],
        },
      },
    ],
    sparse: true,
  },
  classes: {
    type: [
      {
        classCode: { type: String, default: "" }, //Class code of the class
      },
    ],
    sparse: true,
  },
  threads: {
    type: [
      {
        threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" }, //Id of the thread as foreign key
      },
    ],
    default: [], // add main thread id on creation
  },
  batch: { type: String, default: "2022" },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
