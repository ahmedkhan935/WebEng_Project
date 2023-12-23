const mongoose = require("mongoose");

const StudentEvalSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    classCode: { //reference to classroom code
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

const StudentEval = mongoose.model('StudentEval', StudentEvalSchema);
module.exports = StudentEval;
