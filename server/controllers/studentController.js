const Student = require('../models/studentModel');

const studentController = {
    getStudentProfile: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            res.status(200).json(student);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = studentController;