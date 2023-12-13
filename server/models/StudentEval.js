const mongoose = require('mongoose');

const StudentEvalSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    courseCode: {
        type: String,
        ref: 'Course',
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
                obtainedMarks: {
                    type: Number,
                    required: true
                },
                obtainedWeightage: {
                    type: Number,
                    required: true
                },
            }
        ]
    },
    lectures: {
        type: [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                duration: {
                    type: Number,
                    required: true
                },
                status: {
                    type: String,
                    default: 'P'
                },
            }
        ]
    },
    totalObtainedAbs: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true,
        default: 'I'
    },
    attendance: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});