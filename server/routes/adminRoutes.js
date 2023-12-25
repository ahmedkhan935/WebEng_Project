const adminRouter = require("express").Router();
const authMiddleware = require("../middlewares/Auth");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const Auth = require("../middlewares/Auth");
adminRouter.post("/semesters", adminController.createSemester);
adminRouter.get("/semesters", adminController.getAllSemesters);
adminRouter.get("/semesters/:id", adminController.getSemesterById);
adminRouter.patch("/semesters/:id", adminController.updateSemesterById);
adminRouter.delete("/semesters/:id", adminController.deleteSemesterById);
adminRouter.patch("/semesters/:id/end", adminController.markFinished);
adminRouter.post("/student", authController.registerStudent);
adminRouter.get("/student", adminController.viewAllStudents);
adminRouter.get("/student/:id", adminController.viewStudent);
adminRouter.patch("/student/:id", adminController.updateStudent);
adminRouter.delete("/student/:id", adminController.removeStudent);
adminRouter.post("/teacher", authController.registerTeacher);
adminRouter.get("/teacher", adminController.viewAllTeachers);
adminRouter.get("/teacher/:id", adminController.viewTeacher);
adminRouter.patch("/teacher/:id", adminController.updateTeacher);
adminRouter.delete("/teacher/:id", adminController.deleteTeacher);
adminRouter.post("/course", adminController.AddCourse);
adminRouter.get("/course", adminController.viewAllCourses);
adminRouter.get("/course/:id", adminController.viewCourse);
adminRouter.patch("/course/:id", adminController.updateCourse);
adminRouter.delete("/course/:id", adminController.deleteCourse);
adminRouter.get("/logs", adminController.viewLogs);
adminRouter.get("/coursename", adminController.getCoursename);
adminRouter.get("/feedback/:id", adminController.getFeedback);
adminRouter.post("/degree", adminController.addDegree);
adminRouter.get("/degree", adminController.ViewAllDegrees);
adminRouter.post("/assignCourse", adminController.assignCourse);
adminRouter.get("/lowAttendance", adminController.getStudentsWithLowAttendance);
adminRouter.get("/deans", adminController.deanslist);
adminRouter.get("/rectors", adminController.rectorslist);
adminRouter.get("/medalHolders", adminController.medalHolderslist);
adminRouter.get("/degrees", adminController.getDegrees);
module.exports = adminRouter;
