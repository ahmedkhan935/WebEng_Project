const mongoose = require('mongoose');

//User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true , default: ""},
  password: String,
  rollNumber: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
  role: { type: String, default: 'Student' }, //default is student, can be "Teacher" or "Admin"
  semesters: { //Semester array For students 
    type: [  
      { //Structure of each object in semesters array
        semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' }, //Id of the semester as foreign key
        totalAttempted: { type: Number, default: 0 }, //Total credits attempted in this semester
        totalEarned: { type: Number, default: 0 }, //Total credits earned in this semester
        sgpa: { type: Number, default: 0.0 }, //GPA of this semester
        cgpa: { type: Number, default: 0.0 }, //CGPA till this semester
      },
    ], sparse: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;