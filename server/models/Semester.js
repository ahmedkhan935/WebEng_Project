const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    name: { // Fall, Spring
        type: String,
        required: true
    },
    year: { // 2023, 2024
        type: Number,
        required: true,
    },
    startDate: { // 2023-08-01, 2024-01-01
        type: Date,
        required: true
    },
    endDate: { // 2023-12-31, 2024-05-31
        type: Date,
    },
    isCurrent: { // isCurrent: true means this is the current semester
        type: Boolean,
        default: false
    }
});

const Semester = mongoose.model('Semester', SemesterSchema);
module.exports = Semester;