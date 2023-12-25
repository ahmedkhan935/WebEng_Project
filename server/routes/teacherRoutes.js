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
router.get('/classes/:classCode/evaluations', Auth, AuthTeacher, teacherController.getAllEvaluations);
router.get('/classes/:classCode/evaluations/:title', Auth, AuthTeacher, teacherController.getEvaluationMarks);
router.get('/classes/:classCode/feedback', Auth, AuthTeacher, teacherController.getFeedback);

// router.post('/classroom', Auth, AuthTeacher, teacherController.createClassroom);
router.post('/classes/:classCode/announcement', Auth, AuthTeacher,teacherController.addAnnouncement);
router.post('/classes/:classCode/:announcementId/comment', Auth, AuthTeacher, teacherStudentController.comment);
router.post('/classes/:classCode/attendance', Auth, AuthTeacher, teacherController.addAttendance);
router.post('/classes/:classCode/evaluations/:title', Auth, AuthTeacher, teacherController.addEvaluation);

router.put('/classes/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.editAnnouncement);
router.put('/classes/:classCode/attendance', Auth, AuthTeacher, teacherController.updateAttendance);

router.delete('/classes/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.deleteAnnouncement);
router.post("/classes/:classCode/startMeeting", Auth, AuthTeacher, teacherController.startMeet);
router.post("/classes/:classCode/endMeeting", Auth, AuthTeacher, teacherController.endMeet);

module.exports = router;