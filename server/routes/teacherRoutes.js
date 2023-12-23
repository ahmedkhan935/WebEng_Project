const router = require('express').Router();
const Auth = require('../middlewares/Auth');
const AuthTeacher = require('../middlewares/AuthTeacher');
const teacherController = require('../controllers/teacherController');

router.get('/classes', Auth, AuthTeacher,teacherController.getClasses);
router.get('/threads', Auth, AuthTeacher, teacherController.getThreads);

// router.post('/classroom', Auth, AuthTeacher, teacherController.createClassroom);
router.post('/classroom/:classCode/announcement', Auth, AuthTeacher,teacherController.addAnnouncement);

router.delete('/classroom/:classCode/announcement/:announcementId', Auth, AuthTeacher, teacherController.deleteAnnouncement);

module.exports = router;