const router = require('express').Router();
const studentController = require('../controllers/studentController');
const Auth = require('../middlewares/Auth');

router.get('/profile', Auth, studentController.getProfile);
router.get('/courses', Auth, studentController.getCourses);
router.get('/allCourses', Auth, studentController.getAllCourses);
router.get('/classes', Auth, studentController.getClasses);
router.get('/notifications', Auth, studentController.getNotifications);
router.get('/threads', Auth, studentController.getThreads);
router.get('/threads/:threadId', Auth, studentController.getThread);



module.exports = router;