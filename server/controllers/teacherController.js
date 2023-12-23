const Classroom = require('../models/Classroom');
const Thread = require('../models/Thread');
const Teacher = require('../models/Teacher');

const teacherController = {
    getClasses: async (req, res) => {
        try {
            const classrooms = await Classroom.find({ teachers: req.user });
            res.status(200).json({ classrooms });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getThreads: async (req, res) => {
        try {
            const teacher = await Teacher.findById(req.user);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            const threadIds = teacher.threads.map(thread => thread.threadId);
            console.log(threadIds);
            const threads = await Thread.find({ _id: { $in: threadIds } });

            res.status(201).json({ threads });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    createClassroom: async (req, res) => {
        const { name, code } = req.body;
        teachers.push(req.user); // add the teacher who created the classroom to the list of teachers

        try {
            const classroom = new Classroom({
                name,
                code,
                courseId,
                createdBy: req.user,
                teachers,
                students : [],
                announcements : []
            });

            await classroom.save();

            res.status(201).json({
                message: 'Classroom created successfully',
                data: classroom
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating classroom',
                error: error.message
            });
        }
    },

    addAnnouncement: async (req, res) => {
        try {
            const { classCode } = req.params;
            const { type, title, content, dueDate, attachments } = req.body;

            console.log(req.body);

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            console.log("classroom found");
            console.log(req.user);

            const announcement = {
                type,
                title,
                content,
                date: new Date(),
                dueDate,
                attachments,
                createdBy: req.user,
                comments: [],
                submissions: []
            };

            classroom.announcements.push(announcement);

            await classroom.save();

            res.status(201).json({ message: 'Announcement added successfully', announcement });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    deleteAnnouncement: async (req, res) => {
        try {
            const { classCode, announcementId } = req.params;

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const announcement = classroom.announcements.find(announcement => announcement._id == announcementId);
            if (!announcement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }

            const index = classroom.announcements.indexOf(announcement);
            classroom.announcements.splice(index, 1);

            await classroom.save();

            res.status(200).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
};

module.exports = teacherController;