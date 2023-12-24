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
                //Instead of type amd number, make a "name" which woll be unique for each eval
                title: {
                    type: String,
                    required: true,
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
                hasSubmissions: {
                    type: Boolean,
                    required: true
                },
                createdOn: {
                    type: Date,
                    default: new Date()
                },
                dueDate: {
                    type: Date,
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
