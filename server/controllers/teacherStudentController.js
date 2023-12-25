
const Student = require('../models/Student');
const Course = require('../models/Course');
const Classroom = require('../models/Classroom');
const Semester = require('../models/Semester');
const Degree = require('../models/Degree');
const Thread = require('../models/Thread');
const Teacher = require('../models/Teacher');

//Common functions for both teacher and student

const teacherStudentController = {
    getClass: async (req, res) => {
        try {
            let classroom = await Classroom.findOne({ code: req.params.classCode })
                .populate({
                    path: 'createdBy',
                    select: 'name'
                })
                .populate('announcements')
                .populate({
                    path: 'students.studentId',
                    select: '-password'
                })
                .populate({
                    path: 'teachers.teacherId',
                    select: '-password'
                })
                .populate('courseId');

            // Manually populate comments
            if (classroom) {
                classroom = classroom.toObject();
                for (let i = 0; i < classroom.announcements.length; i++) {
                    const announcer = await Teacher.findById(classroom.announcements[i].createdBy).select('name');
                    classroom.announcements[i].createdBy = (announcer ? announcer.name : "Unknown User");

                    for (let j = 0; j < classroom.announcements[i].comments.length; j++) {
                        let commenter = await Student.findById(classroom.announcements[i].comments[j].createdBy).select('name');
                        if (!commenter) { //check if commenter is a teacher
                            commenter = await Teacher.findById(classroom.announcements[i].comments[j].createdBy).select('name');
                        }
                        //  console.log("commenter found " , commenter )
                        classroom.announcements[i].comments[j].createdBy = (commenter ? commenter.name : "Unknown User");
                        //   console.log( "updated createdby" ,  classroom.announcements[i].comments[j].createdBy );
                    }

                    
                    for(let j=0; j<classroom.announcements[i].submissions.length; j++) {
                        const stdId = classroom.announcements[i].submissions[j].studentId;
                        if (req.user == stdId) {
                            classroom.announcements[i].submissions[j].studentId = "USER";
                            classroom.announcements[i].submissions = [ classroom.announcements[i].submissions[j] ];
                            break;
                        }
                       // classroom.announcements[i].submissions[j].studentId = (studentRno ? studentRno.rollNumber : stdId);
                    }
                }
            }

            classroom.announcements = classroom.announcements.reverse();


            res.status(201).json(classroom);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    comment: async (req, res) => {
        try {
            //:classCode/:announcementId
            const { classCode, announcementId } = req.params;
            const { content } = req.body;
            const commenterId = req.user;

            const classroom = await Classroom.findOne({ code: classCode })
            if (!classroom) {
                return res.status(404).json({ error: 'Classroom not found' });
            }

            const announcement = classroom.announcements.id(announcementId);
            if (!announcement) {
                return res.status(404).json({ error: 'Announcement not found' });
            }

            const newComment = {
                content,
                date: new Date(),
                createdBy: commenterId
            };

            announcement.comments.push(newComment);
            await classroom.save();

            const lastIndex = announcement.comments.length - 1;
            const comment = announcement.comments[lastIndex];
            let commenter = await Student.findById(comment.createdBy);
            if (!commenter) { //check if commenter is a teacher
                commenter = await Teacher.findById(comment.createdBy);
            }

            // Create a new comment object with the createdBy field replaced by the student's name
            const commentWithCommenter = {
                ...comment.toObject(),
                createdBy: commenter.name, //Replace the createdBy field with thename 
            };

            res.status(201).json(commentWithCommenter);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getThreads: async (req, res) => {
        try {
            let user;

            user = await Student.findById(req.user)
                .populate('threads.threadId');

            if (!user)
                user = await Teacher.findById(req.user)
                    .populate('threads.threadId');

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const threads = user.threads;
            
            res.status(201).json(threads);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getThread: async (req, res) => {
        try {
            let user;
           
                user = await Student.findById(req.user).populate('threads.threadId');
            if(!user) {
                user = await Teacher.findById(req.user).populate('threads.threadId');
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const threads = user.threads;
            const thread = threads.find(thread => thread.threadId._id == req.params.threadId);
            if (!thread) {
                return res.status(404).json({ error: 'Thread not found' });
            }
            res.status(201).json(thread);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

}
module.exports = teacherStudentController;