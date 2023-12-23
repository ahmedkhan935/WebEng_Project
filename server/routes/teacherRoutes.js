const router = require('express').Router();
const Auth = require('../middlewares/Auth');
const AuthTeacher = require('../middlewares/AuthTeacher');
const teacherController = require('../controllers/teacherController');
const teacherStudentController = require('../controllers/teacherStudentController'); //shared controller


router.get('/classes/:classCode',   Auth, AuthTeacher, teacherStudentController.getClass);
router.get('/classes', Auth, AuthTeacher,teacherController.getClasses);
router.get('/threads', Auth, AuthTeacher, teacherController.getThreads);
router.get('/classroom/:classCode/students', Auth, AuthTeacher, teacherController.getStudents);

// router.post('/classroom', Auth, AuthTeacher, teacherController.createClassroom);
router.post('/classroom/:classCode/announcement', Auth, AuthTeacher,teacherController.addAnnouncement);
router.delete('/classroom/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.deleteAnnouncement);
router.post('/classes/:classCode/:announcementId/comment', Auth, AuthTeacher, teacherStudentController.comment);
router.get('/threads',              Auth, AuthTeacher, teacherStudentController.getThreads);
router.get('/threads/:threadId',    Auth, AuthTeacher, teacherStudentController.getThread);

module.exports = router;