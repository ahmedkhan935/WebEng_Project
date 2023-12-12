const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/profile', studentController.getStudentProfile);
router.get('/courses', studentController.getStudentCourses);
router.get('/notifications', studentController.getStudentNotifications);
