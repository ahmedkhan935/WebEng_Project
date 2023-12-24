const router = require('express').Router();
const Auth = require('../middlewares/Auth');
const AuthTeacher = require('../middlewares/AuthTeacher');
const teacherController = require('../controllers/teacherController');
const teacherStudentController = require('../controllers/teacherStudentController'); //shared controller


router.get('/classes', Auth, AuthTeacher,teacherController.getClasses);
router.get('/classes/:classCode',   Auth, AuthTeacher, teacherStudentController.getClass);
router.get('/classes/:classCode/students', Auth, AuthTeacher, teacherController.getStudents);
router.get('/threads',              Auth, AuthTeacher, teacherStudentController.getThreads);
router.get('/threads/:threadId',    Auth, AuthTeacher, teacherStudentController.getThread);
router.get('/profile',              Auth, AuthTeacher, teacherController.getProfile);
router.get('/classes/:classCode/attendance', Auth, AuthTeacher, teacherController.getAllAttendance);
router.get('/classes/:classCode/attendance/:date', Auth, AuthTeacher, teacherController.getAttendance);

// router.post('/classroom', Auth, AuthTeacher, teacherController.createClassroom);
router.post('/classes/:classCode/announcement', Auth, AuthTeacher,teacherController.addAnnouncement);
router.post('/classes/:classCode/:announcementId/comment', Auth, AuthTeacher, teacherStudentController.comment);
router.post('/classes/:classCode/attendance', Auth, AuthTeacher, teacherController.addAttendance);

router.put('/classes/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.editAnnouncement);
router.put('/classes/:classCode/attendance', Auth, AuthTeacher, teacherController.updateAttendance);

router.delete('/classes/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.deleteAnnouncement);
router.get ('/classes/:classCode/feedback', Auth, AuthTeacher, teacherController.getFeedback);
module.exports = router;