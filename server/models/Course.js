const mongoose = require('mongoose');

//This table will store all the possible courses that can be offered by the university.
const courseSchema = new mongoose.Schema({
    courseCode: { type: String, unique: true },
    courseName: String,
    courseCredits: Number, //max course credits.
    courseType: String, //Lab or Theory
    prereq:{
        type: [
            {
                courseCode: { type: String, ref: 'Course' },
            }
        ]
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;