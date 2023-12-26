const Student = require("../models/Student");
const Course = require("../models/Course");
const Classroom = require("../models/Classroom");
const Semester = require("../models/Semester");
const Degree = require("../models/Degree");
const Thread = require("../models/Thread");
const CourseEval = require("../models/CourseEval");
const Teacher = require("../models/Teacher");
const StudentEval = require("../models/StudentEval");
const path = require("path");
const bucket = require("../firebase_init");



const studentController = {
  getProfile: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCourses: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const courseCodes = student.semesters[
        student.semesters.length - 1
      ].courses.map((course) => course.courseCode); // Get the course codes of the last semester
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const courseCodes = student.semesters.map((semester) =>
        semester.courses.map((course) => course.courseCode)
      ); // Get the course codes of all semesters
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getClasses: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const classCodes = student.classes.map(
        (classroom) => classroom.classCode
      ); // Get the class codes of all classes
      // fetch the classes from the database
      const classes = await Classroom.find({ code: { $in: classCodes } })
        .populate({
          path: "createdBy",
          select: "name",
        })
        .populate({
          path: "teachers.teacherId",
          select: "name",
        })
        .populate("courseId");
      res.status(201).json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllEvaluations: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const classCodes = student.classes.map(
        (classroom) => classroom.classCode
      );
      const studentEvals = await StudentEval.find({
        studentId: req.user,
        classCode: { $in: classCodes },
      });

      let evaluations = [];
      studentEvals.forEach((studentEval) => {
        evaluations.push({
          classCode: studentEval.classCode,
          evaluations: studentEval.evaluations,
        });
      });

      res.status(201).json(evaluations);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getEvaluations: async (req, res) => {
    try {
      const classCode = req.params.classCode;
      const studentEval = await StudentEval.findOne({
        studentId: req.user,
        classCode: classCode,
      });
      if (!studentEval) {
        return res.status(404).json({ error: "Student Eval not found" });
      }

      //-------haadiya bongi starts---------

      let responseEvaluations = studentEval.evaluations;
      let updatedEvaluations = []; // New array to store the updated evaluations
      const courseEval = await CourseEval.findOne({ classCode: classCode });

      for (let evaluation of responseEvaluations) {
        let evalRequired = courseEval.evaluations.find((courseEval) => {
          return courseEval.title == evaluation.title;
        });

        //Create a new object with the updated properties
        let updatedEvaluation = {
          ...evaluation._doc, // Spread the properties of the original evaluation
          totalWeightage: evalRequired.weightage,
          totalMarks: evalRequired.totalMarks,
          averageMarks: evalRequired.averageMarks,
          minMarks: evalRequired.minMarks,
          maxMarks: evalRequired.maxMarks
        };

        updatedEvaluations.push(updatedEvaluation); // Push the updated evaluation into the new array
      }

      //-------haadiya bongi ends---------
      //res.status(201).json(studentEval.evaluations); //uncomment to undo haadiya bongi
      res.status(201).json(updatedEvaluations); // Send the updated evaluations

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAllTodos: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const classCodes = student.classes.map(
        (classroom) => classroom.classCode
      ); //get the class codes of all classes
      const classes = await Classroom.find({ code: { $in: classCodes } });

      let todos = [];
      ////-----------------------------------

      //-------------------------------------
      classes.forEach((classroom) => {
        classroom.announcements.forEach((announcement) => {
          if (announcement.dueDate && new Date(announcement.dueDate) > new Date()) {
            let todoDone = false;
            announcement.submissions.forEach((submission) => {
              if (submission.studentId == req.user) {
                todoDone = true;
              }
            })
            todos.push({
              ...announcement._doc, //include the additional properties and methods provided by Mongoose, and use
              classCode: classroom.code, //add the class code
              done: todoDone,
            });
          }
        });
      }); //get the todos of all classes

      res.status(201).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTodos: async (req, res) => {
    try {
      const classCode = req.params.classCode;
      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ error: "Classroom not found" });
      }

      let todos = [];
      const now = new Date();
      classroom.announcements.forEach((announcement) => {
        if (announcement.dueDate) {
          console.log("due date: ", new Date(announcement.dueDate));
          console.log(now);
        }
        if (
          (announcement.type == "Assignment" || announcement.type == "Quiz") &&
          new Date(announcement.dueDate) > now
        ) {
          todos.push(announcement);
        }
      }); // Get the todos of the class

      res.status(201).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getNotifications: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      res.status(200).json(student.notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllAttendance: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const classCodes = student.classes.map(
        (classroom) => classroom.classCode
      );
      const studentEvals = await StudentEval.find({
        studentId: req.user,
        classCode: { $in: classCodes },
      });

      let attendance = [];
      studentEvals.forEach((studentEval) => {
        attendance.push({
          classCode: studentEval.classCode,
          lectures: studentEval.lectures,
        });
      });

      res.status(201).json(attendance);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAttendance: async (req, res) => {
    try {
      const classCode = req.params.classCode;
      const studentEval = await StudentEval.findOne({
        studentId: req.user,
        classCode: classCode,
      });
      if (!studentEval) {
        return res.status(404).json({ error: "Student Eval not found" });
      }
      res.status(201).json(studentEval.lectures);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  submitAssignment: async (req, res) => {
    try {
      const classCode = req.params.classCode;
      let title = req.params.title;
      title = title.replace(/~/g, " ");

      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ error: "Classroom not found" });
      }

      const evaluation = classroom.announcements.find((announcement) => {
        return announcement.title == title;
      });

      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      let attachments = null;
      let file = null;
      var fileName = null;
      if (req.files) {
        file = req.files.file;
        if (file) {
          //add timestamp to file name only excluding path
          const fileExtension = path.extname(file.name);
          const fileNameWithoutExtension = path.basename(
            file.name,
            fileExtension
          );
          fileName = `${fileNameWithoutExtension}-${Date.now()}${fileExtension}`;

          const blob = bucket.file(fileName);
          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });
          blobWriter.on("error", (err) => {
            res.status(404).send("File couldnot be uploaded");
          });
          blobWriter.on("finish", async () => {
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            // Return the file name and its public URL
          });
          blobWriter.end(file.data);
        }
        attachments = {
          name: fileName,
          originalName: file.name,
        };
      }

      console.log("attachments", attachments);

      evaluation.submissions.push({
        studentId: req.user,
        date: new Date(),
        attachment: attachments,
      });

      await classroom.save();
      res.status(201).json({ message: "Assignment submitted successfully" });
    } catch (err) {
      console.log("ERRRRRR", err);
      res.status(500).json({ error: err.message });
    }
  },

  givefeedback: async (req, res) => {
    const student = await Student.findById(req.user);
    const classCode = req.params.classCode;
    const feedback = req.body.feedback;
    const classs = await Classroom.findOne({ code: classCode });
    if (!classs) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    const studenteval = await StudentEval.findOne({
      studentId: student._id,
      classCode: classCode,
    });
    if (!studenteval) {
      return res.status(404).json({ error: "Student not found" });
    }
    studenteval.feedback = feedback;
    await studenteval.save();
    classs.feedback.push({
      studentId: student._id,
      feedback: feedback,
    });
    await classs.save();
    res.status(201).json({ message: "Feedback given successfully" });
  },
  
  getMeetLink: async (req, res) => {
    try {
      const classCode = req.params.classCode;
      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ error: "Classroom not found" });
      }
      const link = classroom.meetLink;
      if (!link) {
        return res.status(201).json({ error: "Class is not live yet" });
      }
      return res.status(201).json({ link: link });
    } catch (err) {
      console.log("ERRRRRR", err);
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = studentController;
