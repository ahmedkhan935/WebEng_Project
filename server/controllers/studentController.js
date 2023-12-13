const Student = require('../models/Student');
const Course = require('../models/Course');
const Classroom = require('../models/Classroom');

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
            const courseCodes = student.semesters[student.semesters.length - 1].courses.map(course => course.courseCode);// Get the course codes of the last semester
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            const courseCodes = student.semesters.map(semester => semester.courses.map(course => course.courseCode));// Get the course codes of all semesters
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getClasses: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            const classCodes = student.classes.map(classroom => classroom.classCode);// Get the class codes of all classes
            // fetch the classes from the database
            const classes = await Classroom.find({ code: { $in: classCodes } });
            res.status(201).json(classes);

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