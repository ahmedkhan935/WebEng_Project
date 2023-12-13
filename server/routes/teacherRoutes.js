const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.post('/createClassroom', teacherController.createClassroom);

module.exports = router;