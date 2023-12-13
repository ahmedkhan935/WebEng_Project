const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/profile', studentController.getProfile);
router.get('/courses', studentController.getCourses);
router.get('/notifications', studentController.getNotifications);
router


module.exports = router;