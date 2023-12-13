const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Assignment', 'Quiz', 'Material', 'Announcement'],
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
    attachments: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ]
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
                attachments: {
                    type: [
                        {
                            name: {
                                type: String,
                                required: true
                            },
                            url: {
                                type: String,
                                required: true
                            }
                        }
                    ]
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
        unique:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teachers:{
        type: [
            {
                teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            }
        ]
    },
    students:{
        type: [
            {
                studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            }
        ]
    },
    announcements:{
        type: [AnnouncementSchema]
    }
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports = Classroom;