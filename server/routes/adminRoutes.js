const adminRouter = require('express').Router();
const authMiddleware = require('../middlewares/Auth');
const semesterController = require('../controllers/adminController');
adminRouter.post('/semesters', semesterController.createSemester);
adminRouter.get('/semesters', semesterController.getAllSemesters);
adminRouter.get('/semesters/:id', semesterController.getSemesterById);
adminRouter.patch('/semesters/:id', semesterController.updateSemesterById);
adminRouter.delete('/semesters/:id', semesterController.deleteSemesterById);
adminRouter.patch('/semesters/:id/end', semesterController.markFinished);



module.exports = adminRouter;