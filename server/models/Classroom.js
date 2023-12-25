const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Assignment', 'Other', 'Announcement'],
        required: true
    },
    title: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,

    },
    attachments: {
        type:
        {
            name: {
                type: String,

            },
            originalName: {
                type: String,

            },

        },
        default: null
        ,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: {
        type: [
            {
                content: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                createdBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                }
            }
        ]
    },
    submissions: {
        type: [
            {
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                attachment: {
                    type: {
                        name: {
                            type: String,
                            required: true
                        },
                        originalName: {
                            type: String,
                            required: true
                        }
                    }
                }
            }
        ]

    }
});

const ClassroomSchema = new mongoose.Schema({
    name: {// course name
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    degreeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        // required: true
    },

    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
    },

    //ADD SEMESTER ID 
    //(course+degree+semester = unique identifier)

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    teachers: {
        type: [
            {
                teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
            }
        ]
    },
    students: {
        type: [
            {
                studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
            }
        ]
    },
    announcements: {
        type: [AnnouncementSchema]
    },
    status: { //status of the classroom
        type: String,
        enum: ['Pending', 'Ongoing', 'Completed'],
        required: true
    },
    feedback: {
        type: [
            {
                studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
                feedback: { type: String }
            }
        ]
    }
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;