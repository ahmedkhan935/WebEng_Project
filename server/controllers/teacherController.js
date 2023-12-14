const Classroom = require('../models/Classroom');

const teacherController = {
    createClassroom: async (req, res) => {
        const { name, code, createdBy, teachers, students, announcements } = req.body;

        try {
            const classroom = new Classroom({
                name,
                code,
                createdBy,
                teachers,
                students,
                announcements
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

        

};

module.exports = teacherController;