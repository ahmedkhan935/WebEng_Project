const express = require('express');
const authController = require('./authController');

const authRouter = express.Router();

authRouter.post('/register/student', authController.registerStudent);
authRouter.post('/register/teacher', authController.registerTeacher);
authRouter.post('/login/student', authController.loginStudent);
authRouter.post('/login/teacher', authController.loginTeacher);

module.exports = authRouter;
