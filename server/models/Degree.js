const mongoose = require('mongoose');

const DegreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    abbreviation: {
        type: String,
        required: true,
        unique: true
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
const Degree = mongoose.model('Degree', DegreeSchema);
module.exports = Degree;
