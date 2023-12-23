const mongoose = require('mongoose');

const CourseEvalSchema = new mongoose.Schema({

    classCode: {
        type: String,
        required: true
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
                attendance: {
                    type: [
                        {
                            rollNumber: {
                                type: String,
                                required: true
                            },
                            name: {
                                type: String,
                                required: true
                            },
                            status: {
                                type: String,
                                required: true
                            }
                        }
                    ]
                }
            }
        ]
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
const CourseEval = mongoose.model('CourseEval', CourseEvalSchema);
module.exports = CourseEval;
