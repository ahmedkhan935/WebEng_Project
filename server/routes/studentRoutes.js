const router = require('express').Router();
const studentController = require('../controllers/studentController');
const Auth = require('../middlewares/Auth');

router.get('/profile', studentController.getProfile);
router.get('/courses', studentController.getCourses);
router.get('/allCourses', studentController.getAllCourses);
router.get('/classes', Auth, studentController.getClasses);
router.get('/notifications', studentController.getNotifications);
router


module.exports = router;