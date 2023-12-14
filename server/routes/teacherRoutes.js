const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.post('/createClassroom', teacherController.createClassroom);
//router.get('/classes', teacherController.getProfile);

module.exports = router;