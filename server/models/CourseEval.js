const mongoose = require('mongoose');

const CourseEvalSchema = new mongoose.Schema({

    courseCode: {
        type: String,
        ref: 'Course',
    },
    degreeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
    },
    evaluations: {
        type: [
            {
                type: { // assignment, quiz, midsem, endsem
                    type: String,
                    required: true
                },
                number: {
                    type: Number,
                    required: true
                },
                weightage: {
                    type: Number,
                    required: true
                },
                totalMarks: {
                    type: Number,
                    required: true
                },
                averageMarks: {
                    type: Number,
                    required: true
                },
                maxMarks: {
                    type: Number,
                    required: true
                },
                minMarks: {
                    type: Number,
                    required: true
                },
            }
        ]
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false
    }


});