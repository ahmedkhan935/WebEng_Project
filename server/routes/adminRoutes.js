const adminRouter = require("express").Router();
const AuthAdmin = require("../middlewares/AuthAdmin");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const Auth = require("../middlewares/Auth");

adminRouter.post("/semesters", Auth, AuthAdmin, adminController.createSemester);
adminRouter.get("/semesters", Auth, AuthAdmin, adminController.getAllSemesters);
adminRouter.get(
  "/semesters/:id",
  Auth,
  AuthAdmin,
  adminController.getSemesterById
);
adminRouter.patch(
  "/semesters/:id",
  Auth,
  AuthAdmin,
  adminController.updateSemesterById
);
adminRouter.delete(
  "/semesters/:id",
  Auth,
  AuthAdmin,
  adminController.deleteSemesterById
);
adminRouter.patch(
  "/semesters/:id/end",
  Auth,
  AuthAdmin,
  adminController.markFinished
);
adminRouter.post("/student", Auth, AuthAdmin, authController.registerStudent);
adminRouter.get("/student", Auth, AuthAdmin, adminController.viewAllStudents);
adminRouter.get("/student/:id", Auth, AuthAdmin, adminController.viewStudent);
adminRouter.patch(
  "/student/:id",
  Auth,
  AuthAdmin,
  adminController.updateStudent
);
adminRouter.delete(
  "/student/:id",
  Auth,
  AuthAdmin,
  adminController.removeStudent
);
adminRouter.post("/teacher", Auth, AuthAdmin, authController.registerTeacher);
adminRouter.get("/teacher", Auth, AuthAdmin, adminController.viewAllTeachers);
adminRouter.get("/teacher/:id", Auth, AuthAdmin, adminController.viewTeacher);
adminRouter.patch(
  "/teacher/:id",
  Auth,
  AuthAdmin,
  adminController.updateTeacher
);
adminRouter.delete(
  "/teacher/:id",
  Auth,
  AuthAdmin,
  adminController.deleteTeacher
);
adminRouter.post("/course", Auth, AuthAdmin, adminController.AddCourse);
adminRouter.get("/course", Auth, AuthAdmin, adminController.viewAllCourses);
adminRouter.get("/course/:id", Auth, AuthAdmin, adminController.viewCourse);
adminRouter.patch("/course/:id", Auth, AuthAdmin, adminController.updateCourse);
adminRouter.delete(
  "/course/:id",
  Auth,
  AuthAdmin,
  adminController.deleteCourse
);
adminRouter.get("/logs", Auth, AuthAdmin, adminController.viewLogs);
adminRouter.get("/coursename", Auth, AuthAdmin, adminController.getCoursename);
adminRouter.get("/feedback/:id", Auth, AuthAdmin, adminController.getFeedback);
adminRouter.post("/degree", Auth, AuthAdmin, adminController.addDegree);
adminRouter.get("/degree", Auth, AuthAdmin, adminController.ViewAllDegrees);
adminRouter.post(
  "/assignCourse",
  Auth,
  AuthAdmin,
  adminController.assignCourse
);
adminRouter.get(
  "/lowAttendance",
  Auth,
  AuthAdmin,
  adminController.getStudentsWithLowAttendance
);
adminRouter.get("/deans", Auth, AuthAdmin, adminController.deanslist);
adminRouter.get("/rectors", Auth, AuthAdmin, adminController.rectorslist);
adminRouter.get(
  "/medalHolders",
  Auth,
  AuthAdmin,
  adminController.medalHolderslist
);
adminRouter.post(
  "/saveSemesterCourses",
  Auth,
  AuthAdmin,
  adminController.saveSemesterCourses
);
adminRouter.post(
  "/getDegreeCourses",
  Auth,
  AuthAdmin,
  adminController.getDegreeCourses
);
adminRouter.get("/degrees", Auth, AuthAdmin, adminController.getDegrees);
adminRouter.get(
  "/startSemester",

  adminController.startSemester
);
adminRouter.post(
  "/endSemester",

  adminController.endSemester
);
module.exports = adminRouter;
