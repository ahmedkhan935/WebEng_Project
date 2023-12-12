const mongoose = require('mongoose');
const Course = require('./Course');

const DegreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    semCourses: {
        type: [
            {
                semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
                courses: [
                    {
                        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
                    }
                ]
            }
        ]
    },
    totalCredits: {
        type: Number,
        required: true
    },
    totalSemesters: {
        type: Number,
        required: true
    }
    
});