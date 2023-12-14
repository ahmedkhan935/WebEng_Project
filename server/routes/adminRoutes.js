const adminRouter = require('express').Router();
const authMiddleware = require('../middlewares/Auth');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
adminRouter.post('/semesters', adminController.createSemester);
adminRouter.get('/semesters', adminController.getAllSemesters);
adminRouter.get('/semesters/:id', adminController.getSemesterById);
adminRouter.patch('/semesters/:id', adminController.updateSemesterById);
adminRouter.delete('/semesters/:id', adminController.deleteSemesterById);
adminRouter.patch('/semesters/:id/end', adminController.markFinished);
adminRouter.post('/student', authController.registerStudent);
adminRouter.get('/student', adminController.viewAllStudents);
adminRouter.get('/student/:id', adminController.viewStudent);
adminRouter.patch('/student/:id', adminController.updateStudent);
adminRouter.delete('/student/:id', adminController.removeStudent);
adminRouter.post('/teacher', authController.registerTeacher);
adminRouter.get('/teacher', adminController.viewAllTeachers);
adminRouter.get('/teacher/:id', adminController.viewTeacher);
adminRouter.patch('/teacher/:id', adminController.updateTeacher);
adminRouter.delete('/teacher/:id', adminController.deleteTeacher);
adminRouter.post('/course', adminController.AddCourse);
adminRouter.get('/course', adminController.viewAllCourses);
adminRouter.get('/course/:id', adminController.viewCourse);
adminRouter.patch('/course/:id', adminController.updateCourse);
adminRouter.delete('/course/:id', adminController.deleteCourse);




module.exports = adminRouter;