const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

//router.get('/classes', teacherController.getProfile);
router.post('/classroom', teacherController.createClassroom);
router.post('/classroom/:classCode/announcement', teacherController.addAnnouncement);

module.exports = router;