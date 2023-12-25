const Student = require("../models/Student");
const Course = require("../models/Course");
const Classroom = require("../models/Classroom");
const Semester = require("../models/Semester");
const Degree = require("../models/Degree");
const Thread = require("../models/Thread");
const Teacher = require("../models/Teacher");
const StudentEval = require("../models/StudentEval");

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

  getAllTodos: async (req, res) => {
    try {
      const student = await Student.findById(req.user);
      const classCodes = student.classes.map(
        (classroom) => classroom.classCode
      ); // Get the class codes of all classes
      const classes = await Classroom.find({ code: { $in: classCodes } });

      let todos = [];
      classes.forEach((classroom) => {
        classroom.announcements.forEach((announcement) => {
          if (
            (announcement.type == "Assignment" ||
              announcement.type == "Quiz") &&
            new Date(announcement.dueDate) > new Date()
          ) {
            todos.push(announcement);
          }
        });
      }); // Get the todos of all classes

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

  submitAssignment: async (req, res) => {
    try {
      const classroom = await Classroom.findOne({ code: req.params.classCode });
      if (!classroom) {
        return res.status(404).json({ error: "Classroom not found" });
      }

      const evaluation = classroom.announcements.find((announcement) => {
        return announcement.title == req.params.title;
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
          const fileNameWithoutExtension = path.basename(file.name, fileExtension);
          fileName = `${fileNameWithoutExtension}-${Date.now()}${fileExtension}`;

          const blob = bucket.file(fileName);
          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });
          blobWriter.on('error', ((err) => {

            res.status(404).send('File couldnot be uploaded');
          }));
          blobWriter.on('finish', async () => {
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            // Return the file name and its public URL

          });
          blobWriter.end(file.data);
        }
        attachments = {
          name: fileName,
          originalName: file.name
        };
      }

      evaluation.submissions.push({
        studentId: req.user,
        date: new Date(),
        attachments: attachments,
      });

      await classroom.save();
    } catch (err) {
      console.log(err);
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

    const studenteval = await StudentEval.findOne({ studentId: student._id, classCode: classCode });
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
  }
};

module.exports = studentController;