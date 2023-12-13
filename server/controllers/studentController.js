const Student = require('../models/Student');

const studentController = {
    getProfile: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            res.status(200).json(student);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCourses: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            res.status(200).json(student.courses);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getNotifications: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            res.status(200).json(student.notifications);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    
};

module.exports = studentController;