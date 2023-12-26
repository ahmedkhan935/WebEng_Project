const Classroom = require("../models/Classroom");
const Thread = require("../models/Thread");
const Teacher = require("../models/Teacher");
const StudentEval = require("../models/StudentEval");
const Student = require("../models/Student");
const CourseEval = require("../models/CourseEval");
const mongoose = require("mongoose");
const path = require("path");
const bucket = require("../firebase_init");

// var cache = {};

const teacherController = {
  getClasses: async (req, res) => {
    // try {
    //     console.log("entered getClasses")
    //    const teacher = await Teacher.findById(req.user);
    //     if (!teacher) {
    //         return res.status(404).json({ message: 'Teacher not found' });
    //     }
    //     const classroomIds = teacher.classes.map(classroom => classroom.classroomId);
    //     const classes = await Classroom.find({ _id: { $in: classroomIds } });

    //     res.status(200).json({ classes });
    // } catch (error) {
    //     console.log("getclasses erorr")
    //     console.log(error);

    //     res.status(500).json({ message: 'Server error', error });
    // }
    try {
      const teacher = await Teacher.findById(req.user);
      const classCodes = teacher.classes.map(
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

  getStudents: async (req, res) => {
    try {
      const { classCode } = req.params;
      console.log(classCode);
      const classroom = await Classroom.findOne({ code: classCode }).populate({
        path: "students.studentId",
        select: "name rollNumber",
      });

      if (!classroom) {
        console.log("sad");
      }
      let students = classroom.students;
      students = students.map((student) => {
        return {
          rollNumber: student.studentId.rollNumber,
          name: student.studentId.name,
        };
      });

      res.status(201).json(students);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  getThreads: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.user);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      const threadIds = teacher.threads.map((thread) => thread.threadId);
      console.log(threadIds);
      const threads = await Thread.find({ _id: { $in: threadIds } });

      res.status(201).json({ threads });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getProfile: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.user);
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createClassroom: async (req, res) => {
    const { name, code } = req.body;

    try {
      const classroom = new Classroom({
        name,
        code,
        courseId,
        createdBy: req.user,
        teachers,
        students: [],
        announcements: [],
      });

      await classroom.save();

      res.status(201).json({
        message: "Classroom created successfully",
        data: classroom,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating classroom",
        error: error.message,
      });
    }
  },

  addAnnouncement: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { classCode } = req.params;
      let { type, title, content, dueDate, weightage, totalMarks } = req.body;

      const classroom = await Classroom.findOne({ code: classCode }).session(
        session
      );
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
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
      var announcement = {
        type,
        title,
        content,
        date: new Date(),
        attachments,
        createdBy: req.user,
        comments: [],
        submissions: [],
      };
      console.log(dueDate);
      if (dueDate) {
        announcement.dueDate = dueDate;
      }
      classroom.announcements.push(announcement);
      await classroom.save({ session });

      //add the assignment and quiz to the course eval evaluations and student eval evaluations
      if (type == "Assignment" || type == "Other") {
        let courseEval = await CourseEval.findOne({ classCode }).session(
          session
        );

        if (!courseEval) {
          return res.status(404).json({ message: "Course eval not found" });
        }

        const evaluation = {
          title,
          weightage,
          totalMarks,
          averageMarks: 0,
          maxMarks: 0,
          minMarks: 0,
          hasSubmissions: type == "Assignment" ? true : false,
          dueDate,
        };

        // (courseEval.evaluations)? courseEval.evaluations.push(evaluation): courseEval.evaluations = [evaluation];
        courseEval.evaluations.push(evaluation);
        await courseEval.save({ session });
      }

      const authorName = await Teacher.findById(req.user).select("name");
      announcement.createdBy = authorName.name;

      await session.commitTransaction();
      res.status(201).json(announcement);
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    } finally {
      session.endSession();
    }
  },

  editAnnouncement: async (req, res) => {
    try {
      const { classCode, announcementId } = req.params;
      const { title, content } = req.body;

      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      const announcement = classroom.announcements.find(
        (announcement) => announcement._id == announcementId
      );
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      announcement.title = title;
      announcement.content = content;

      await classroom.save();

      res
        .status(201)
        .json({ message: "Announcement edited successfully", announcement });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  deleteAnnouncement: async (req, res) => {
    try {
      const { classCode, announcementId } = req.params;

      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      const announcement = classroom.announcements.find(
        (announcement) => announcement._id == announcementId
      );
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      const index = classroom.announcements.indexOf(announcement);
      classroom.announcements.splice(index, 1);

      await classroom.save();

      res.status(201).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  addAttendance: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { classCode } = req.params;
      const { date, duration, attendance } = req.body;

      const courseEval = await CourseEval.findOne({ classCode }).session(
        session
      );
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      courseEval.lectures.push({ date, duration, attendance });

      const classroom = await Classroom.findOne({ code: classCode })
        .populate({
          path: "students.studentId",
          select: "rollNumber",
        })
        .session(session);

      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      const students = classroom.students;
      // console.log(students);
      if (!students) {
        return res.status(404).json({ message: "No students found" });
      }

      let studentEvals = await StudentEval.find({ classCode })
        .populate({
          path: "studentId",
          select: "rollNumber",
        })
        .session(session);

      // console.log("eval: ", studentEvals);

      if (!studentEvals) {
        return res.status(404).json({ message: "No student evals found" });
      }

      for (let i = 0; i < studentEvals.length; i++) {
        const studentAttendance = attendance.find(
          (student) =>
            student.rollNumber == studentEvals[i].studentId.rollNumber
        );
        // console.log("studentAttendance: ", studentAttendance);
        const status = studentAttendance.status;
        studentEvals[i].lectures.push({ date, duration, status });
        await studentEvals[i].save({ session });
        // console.log("saved", studentEvals[i]);
      }

      await courseEval.save({ session });

      // return date, presents, absents
      let attendanceData = {
        date,
        duration,
        presents: attendance.filter((student) => student.status === "P").length,
        absents: attendance.filter((student) => student.status === "A").length,
      };

      await session.commitTransaction();
      res
        .status(201)
        .json({ message: "Attendance added successfully", attendanceData });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    } finally {
      session.endSession();
    }
  },

  updateAttendance: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { classCode } = req.params;
      const { date, duration, attendance } = req.body;

      const courseEval = await CourseEval.findOne({ classCode }).session(
        session
      );
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      const lecture = courseEval.lectures.find(
        (lecture) => new Date(lecture.date).toISOString().split("T")[0] == date
      );
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }

      lecture.duration = duration;
      lecture.attendance = attendance;

      let studentEvals = await StudentEval.find({ classCode })
        .populate({
          path: "studentId",
          select: "rollNumber",
        })
        .session(session);

      if (!studentEvals) {
        return res.status(404).json({ message: "No student evals found" });
      }

      for (let i = 0; i < studentEvals.length; i++) {
        const studentAttendance = attendance.find(
          (student) =>
            student.rollNumber == studentEvals[i].studentId.rollNumber
        );
        const status = studentAttendance.status;
        const studentLecture = studentEvals[i].lectures.find(
          (lecture) =>
            new Date(lecture.date).toISOString().split("T")[0] == date
        );
        if (studentLecture) {
          studentLecture.status = status;
          studentLecture.duration = duration;
          await studentEvals[i].save({ session });
        }
      }

      await courseEval.save({ session });
      await session.commitTransaction();
      res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    } finally {
      session.endSession();
    }
  },

  getAllAttendance: async (req, res) => {
    try {
      const { classCode } = req.params;

      const courseEval = await CourseEval.findOne({ classCode });
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      const lectures = courseEval.lectures;
      if (!lectures) {
        return res.status(404).json({ message: "No lectures found" });
      }

      let attendanceData = lectures.map((lecture) => {
        const presents = lecture.attendance.filter(
          (student) => student.status === "P"
        ).length;
        const absents = lecture.attendance.filter(
          (student) => student.status === "A"
        ).length;
        const duration = lecture.duration;

        return {
          date: lecture.date,
          duration,
          presents,
          absents,
        };
      });

      attendanceData = attendanceData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ); // sort by date

      return res.status(200).json(attendanceData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  getAttendance: async (req, res) => {
    try {
      const { classCode, date } = req.params;

      const courseEval = await CourseEval.findOne({ classCode });
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      const lecture = courseEval.lectures.find(
        (lecture) => new Date(lecture.date).toISOString().split("T")[0] == date
      );
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }

      const attendance = lecture.attendance;
      if (!attendance) {
        return res.status(404).json({ message: "No attendance found" });
      }

      res.status(200).json(attendance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  getFeedback: async (req, res) => {
    const { classCode } = req.params;
    const classroom = await Classroom.findOne({ code: classCode }).populate({
      path: "feedback.studentId",
      select: "name",
    });
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    const feedback = classroom.feedback;
    if (!feedback) {
      return res.status(404).json({ message: "No feedback found" });
    }
    res.json(feedback);
  },

  getAllEvaluations: async (req, res) => {
    try {
      const { classCode } = req.params;

      const courseEval = await CourseEval.findOne({ classCode });

      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }
      // console.log(courseEval);

            let evaluations = courseEval.evaluations;
            if (!evaluations) {
                evaluations = [];
                return res.status(201).json(evaluations);
            }

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const assignments = classroom.announcements.filter(announcement => (announcement.type == 'Assignment' || announcement.type == 'Other'));

            console.log("assignments", assignments);

            let newEvals = [];
            if (assignments) {
                console.log("has assignments");
                assignments.forEach(assignment => {
                    let evalIndex = evaluations.indexOf(evaluations.find(evaluation => evaluation.title == assignment.title));
                    if (evalIndex != -1) {
                        // console.log("content", assignment.content);
                        // console.log("eval", evaluations[evalIndex]);

                        //evaluations[evalIndex] = { ...evaluations[evalIndex]._doc, content: assignment.content };
                        const newEval = { ...evaluations[evalIndex]._doc, content: assignment.content };
                        // console.log("evaluation", evaluations[evalIndex]);
                        //console.log("new eval", newEval);
                        newEvals.push(newEval);
                    }
                });
            }

            newEvals.sort((a, b) => {
                // If both have submissions or both don't, sort by date
                if ((a.hasSubmissions && b.hasSubmissions) || (!a.hasSubmissions && !b.hasSubmissions)) {
                    return new Date(b.createdOn) - new Date(a.createdOn);
                }
                // If only a has submissions, a should come first
                if (a.hasSubmissions) {
                    return -1;
                }
                // If only b has submissions, b should come first
                if (b.hasSubmissions) {
                    return 1;
                }
            });


            //console.log("EVAAAALLLL", evaluations);

            res.status(200).json(newEvals);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

  getEvaluationMarks: async (req, res) => {
    try {
      let { classCode, title } = req.params;
      title = title.replace(/~/g, " ");

            // const cacheKey = `${classCode}-${title}`;
            // if (cache[cacheKey]) {
            //     return res.status(200).json(cache[cacheKey]);
            // }

      const courseEval = await CourseEval.findOne({ classCode });
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      const evaluation = courseEval.evaluations.find(
        (evaluation) => evaluation.title == title
      );
      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
      }

      const studentEvals = await StudentEval.find({ classCode });
      // .populate({
      //     path: 'studentId',
      //     select: 'rollNumber name'
      // });

      if (!studentEvals) {
        return res.status(404).json({ message: "No student evals found" });
      }
      //haadiya bongi start ----
      const studentIds = studentEvals.map((eval) => eval.studentId);
      const students = await Student.find({ _id: { $in: studentIds } }).select(
        "rollNumber name"
      );

      studentEvals.forEach((eval) => {
        const student = students.find(
          (student) => student._id.toString() === eval.studentId.toString()
        );
        if (student) {
          eval.studentRollNumber = student.rollNumber;
          eval.studentName = student.name;
        }
      });
      //haadiya= bongi end-----

      let data = studentEvals.map((studentEval) => {
        const eval = studentEval.evaluations.find(
          (eval) => eval.title == evaluation.title
        );
        const obtainedMarks = eval ? eval.obtainedMarks : 0;
        const obtainedWeightage = eval ? eval.obtainedWeightage : 0;
        return {
          studentId: studentEval.studentId,
          rollNumber: studentEval.studentRollNumber,
          name: studentEval.studentName,
          obtainedMarks,
          obtainedWeightage,
        };
      });

      if (evaluation.hasSubmissions) {
        const classroom = await Classroom.findOne({ code: classCode });
        if (!classroom) {
          return res.status(404).json({ message: "Classroom not found" });
        }

        const assignment = classroom.announcements.find(
          (announcement) => announcement.title == title
        );
        if (!assignment) {
          return res.status(404).json({ message: "Assignment not found" });
        }

        // console.log(assignment);
        const submissions = assignment.submissions
          ? assignment.submissions
          : [];

        data = data.map((student) => {
          const submission = submissions.find(
            (submission) =>
              submission.studentId.toString() == student.studentId.toString()
          );
          if (submission) {
            student.submission = submission.attachment;
          } else {
            student.submission = null;
          }
          return student;
        });
      }

            // cache[cacheKey] = data;
            res.status(200).json(data);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

  addEvaluation: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let { classCode, title } = req.params;
      const { evaluations } = req.body;

            title = title.replace(/~/g, ' ');
            // const cacheKey = `${classCode}-${title}`;

      const courseEval = await CourseEval.findOne({ classCode }).session(
        session
      );
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      let evaluation = courseEval.evaluations.find(
        (evaluation) => evaluation.title == title
      );
      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
      }
      console.log("eval", evaluation);
      console.log("evals", evaluations);

      const calcAvg = () => {
        let sum = 0;
        evaluations.forEach((evaluation) => {
          sum += evaluation.obtainedMarks;
        });
        return sum / evaluations.length;
      };
      const averageMarks = calcAvg();

      const calcMax = () => {
        let max = 0;
        evaluations.forEach((evaluation) => {
          if (evaluation.obtainedMarks > max) {
            max = evaluation.obtainedMarks;
          }
        });
        return max;
      };
      const maxMarks = calcMax();

      const calcMin = () => {
        let min = maxMarks;
        evaluations.forEach((evaluation) => {
          if (evaluation.obtainedMarks < min) {
            min = evaluation.obtainedMarks;
          }
        });
        return min;
      };
      const minMarks = calcMin();

      console.log("avg", averageMarks, "max", maxMarks, "min", minMarks);

      evaluation.averageMarks = averageMarks;
      evaluation.maxMarks = maxMarks;
      evaluation.minMarks = minMarks;

            const studentEvals = await StudentEval.find({ classCode })
                .populate({
                    path: 'studentId',
                    select: 'rollNumber'
                })
                .session(session);

      if (!studentEvals) {
        return res.status(404).json({ message: "No student evals found" });
      }

      for (let i = 0; i < studentEvals.length; i++) {
        const studentEval = studentEvals[i];
        const eval = studentEval.evaluations.find(
          (eval) => eval.title == title
        );

        const obtainedMarks = evaluations.find(
          (evaluation) =>
            evaluation.rollNumber == studentEval.studentId.rollNumber
        ).obtainedMarks;
        const obtainedWeightage =
          (obtainedMarks * evaluation.weightage) / evaluation.totalMarks;

        if (eval) {
          eval.obtainedMarks = obtainedMarks;
          eval.obtainedWeightage = obtainedWeightage;
          await studentEval.save({ session });
        } else {
          studentEval.evaluations.push({
            title,
            obtainedMarks,
            obtainedWeightage,
          });
          await studentEval.save({ session });
        }

                // if(cache[cacheKey]){
                //     cache[cacheKey].forEach(student => {
                //         if(student.rollNumber == studentEval.studentId.rollNumber){
                //             student.obtainedMarks = obtainedMarks;
                //             student.obtainedWeightage = obtainedWeightage;
                //         }
                //     });
                // }
            }

      await courseEval.save({ session });

      await session.commitTransaction();
      res.status(200).json({ message: "Assignment marked successfully" });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    } finally {
      session.endSession();
    }
  },

  startMeet: async (req, res) => {
    try {
      const { classCode } = req.params;
      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      const meetLink = req.body.meetLink;
      if (!meetLink) {
        return res.status(404).json({ message: "Meet link not found" });
      }
      if (classroom.meetLink) {
        return res.status(404).json({ message: "Meet link already exists" });
      }
      classroom.meetLink = meetLink;
      await classroom.save();

      res.status(200).json({ meetLink });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  endMeet: async (req, res) => {
    try {
      const { classCode } = req.params;
      const classroom = await Classroom.findOne({ code: classCode });
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }
      if (!classroom.meetLink) {
        return res.status(404).json({ message: "Meet link not found" });
      }
      classroom.meetLink = null;
      await classroom.save();
      res.status(200).json({ message: "Meet link deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

    updateEvaluation: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let { classCode } = req.params;
            let oldTitle = req.params.title;
            let { title, content, weightage, totalMarks, dueDate } = req.body;

            console.log("title: ", title, "weightage: ", weightage, "totalMarks: ", totalMarks, "dueDate: ", dueDate)

            oldTitle = String(oldTitle).replace(/~/g, ' ');

      let classroom = await Classroom.findOne({ code: classCode }).session(
        session
      );
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      let announcement = classroom.announcements.find(
        (announcement) => announcement.title == oldTitle
      );
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      let courseEval = await CourseEval.findOne({ classCode }).session(session);
      if (!courseEval) {
        return res.status(404).json({ message: "Course eval not found" });
      }

      let evaluation = courseEval.evaluations.find(
        (evaluation) => evaluation.title == oldTitle
      );
      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
      }

      const oldTotalMarks = evaluation.totalMarks;

      // updating student evals
      let studentEvals = await StudentEval.find({ classCode }).session(session);
      if (studentEvals) {
        for (let i = 0; i < studentEvals.length; i++) {
          const studentEval = studentEvals[i];
          const eval = studentEval.evaluations.find(
            (eval) => eval.title == oldTitle
          );
          if (eval) {
            if (title) {
              eval.title = title;
            }
            if (weightage) {
              eval.obtainedWeightage =
                (eval.obtainedMarks * weightage) / oldTotalMarks;
            }
            if (totalMarks) {
              eval.obtainedMarks = 0;
              eval.obtainedWeightage = 0;
            }
            if (dueDate) eval.dueDate = dueDate;
          }

                    await studentEval.save({ session });
                }
            }

            if (title) { evaluation.title = title; announcement.title = title; }
            if (content) { announcement.content = content; }
            if (dueDate) { evaluation.dueDate = dueDate; announcement.dueDate = dueDate; }
            if (weightage) { evaluation.weightage = weightage; }
            if (totalMarks) { evaluation.totalMarks = totalMarks; }

      await courseEval.save({ session });
      await classroom.save({ session });

            await session.commitTransaction();
            res.status(200).json({ message: 'Assignment updated successfully' });

        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        } finally {
            session.endSession();
        }
    },

    deleteEvaluation: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            let { classCode } = req.params;
            let title = req.params.title;

            title = String(title).replace(/~/g, ' ');

            let classroom = await Classroom.findOne({ code: classCode }).session(session);
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            let announcement = classroom.announcements.find(announcement => announcement.title == title);
            if (!announcement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }

            let courseEval = await CourseEval.findOne({ classCode }).session(session);
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            let evaluation = courseEval.evaluations.find(evaluation => evaluation.title == title);
            if (!evaluation) {
                return res.status(404).json({ message: 'Evaluation not found' });
            }

            // updating student evals
            let studentEvals = await StudentEval.find({ classCode }).session(session);
            if (studentEvals) {
                for (let i = 0; i < studentEvals.length; i++) {
                    const studentEval = studentEvals[i];
                    const eval = studentEval.evaluations.find(eval => eval.title == title);
                    if (eval) {
                        const index = studentEval.evaluations.indexOf(eval);
                        studentEval.evaluations.splice(index, 1);
                    }

                    await studentEval.save({ session });
                }
            }

            const index = classroom.announcements.indexOf(announcement);
            classroom.announcements.splice(index, 1);

            const evalIndex = courseEval.evaluations.indexOf(evaluation);
            courseEval.evaluations.splice(evalIndex, 1);

            await courseEval.save({ session });
            await classroom.save({ session });

            await session.commitTransaction();
            res.status(200).json({ message: 'Assignment deleted successfully' });

        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        } finally {
            session.endSession();
        }
    },

};


      await session.commitTransaction();
      res.status(200).json({ message: "Assignment updated successfully" });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    } finally {
      session.endSession();
    }
  },
};

module.exports = teacherController;
