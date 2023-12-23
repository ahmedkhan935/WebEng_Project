const router = require('express').Router();
const studentController = require('../controllers/studentController');
const teacherStudentController = require('../controllers/teacherStudentController'); //shared controller for common operations
const Auth = require('../middlewares/Auth');
const AuthStudent = require('../middlewares/AuthStudent');

// route, User authentication, User authorization, controller
router.get('/profile',              Auth, AuthStudent, studentController.getProfile);
router.get('/courses',              Auth, AuthStudent, studentController.getCourses);
router.get('/allCourses',           Auth, AuthStudent, studentController.getAllCourses);
router.get('/classes',              Auth, AuthStudent, studentController.getClasses);
router.get('/classes/:classCode',   Auth, AuthStudent, teacherStudentController.getClass);
router.get('/todos',                Auth, AuthStudent, studentController.getAllTodos);
router.get('/todos/:classCode',      Auth, AuthStudent, studentController.getTodos);
router.get('/notifications',        Auth, AuthStudent, studentController.getNotifications);
router.get('/threads',              Auth, AuthStudent, teacherStudentController.getThreads);
router.get('/threads/:threadId',    Auth, AuthStudent, teacherStudentController.getThread);
router.post('/classes/:classCode/:announcementId/comment', Auth, AuthStudent, teacherStudentController.comment);
module.exports = router;