const Classroom = require('../models/Classroom');

const teacherController = {
    createClassroom: async (req, res) => {
        const { name, code, createdBy, teachers } = req.body;

        try {
            const classroom = new Classroom({
                name,
                code,
                courseId,
                createdBy,
                teachers,
                students : [],
                announcements : [],

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
            const { type, title, content, date, dueDate, attachments, createdBy } = req.body;

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const announcement = {
                type,
                title,
                content,
                date,
                dueDate,
                attachments,
                createdBy,
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
};

module.exports = teacherController;