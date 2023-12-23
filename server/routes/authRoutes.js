const express = require('express');
const authController = require('../controllers/authController');
const Auth = require('../middlewares/Auth');

const authRouter = express.Router();

authRouter.post('/register/student', authController.registerStudent);
authRouter.post('/register/teacher', authController.registerTeacher);
authRouter.post('/login/student', authController.loginStudent);
authRouter.post('/login/teacher', authController.loginTeacher);
authRouter.post('/logout',Auth, authController.logout);

module.exports = authRouter;
