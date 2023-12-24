const Classroom = require('../models/Classroom');
const Thread = require('../models/Thread');
const Teacher = require('../models/Teacher');
const StudentEval = require('../models/StudentEval');
const CourseEval = require('../models/CourseEval');
const mongoose = require('mongoose');
const path = require('path');
const bucket = require('../firebase_init');

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
            const classCodes = teacher.classes.map(classroom => classroom.classCode);// Get the class codes of all classes
            // fetch the classes from the database
            const classes = await Classroom.find({ code: { $in: classCodes } })
                .populate({
                    path: 'createdBy',
                    select: 'name'
                })
                .populate({
                    path: 'teachers.teacherId',
                    select: 'name'
                })
                .populate('courseId');
            res.status(201).json(classes);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getStudents: async (req, res) => {
        try {
            const { classCode } = req.params;
            console.log(classCode);
            const classroom = await Classroom.findOne({ code: classCode })
                .populate({
                    path: 'students.studentId',
                    select: 'name rollNumber'
                });

                if(!classroom){
                 console.log("sad")
                }
            let students = classroom.students;
            students = students.map(student => {
                return { rollNumber: student.studentId.rollNumber, name: student.studentId.name };
            });

            res.status(201).json( students );

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getThreads: async (req, res) => {
        try {
            const teacher = await Teacher.findById(req.user);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            const threadIds = teacher.threads.map(thread => thread.threadId);
            console.log(threadIds);
            const threads = await Thread.find({ _id: { $in: threadIds } });

            res.status(201).json({ threads });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
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
        teachers.push(req.user); // add the teacher who created the classroom to the list of teachers

        try {
            const classroom = new Classroom({
                name,
                code,
                courseId,
                createdBy: req.user,
                teachers,
                students: [],
                announcements: []
            });

            await classroom.save();

            res.status(201).json({
                message: 'Classroom created successfully',
                data: classroom
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating classroom',
                error: error.message
            });
        }
    },

    addAnnouncement: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { classCode } = req.params;
            let { type, title, content, dueDate } = req.body;
            let { weightage, totalMarks } = req.body;

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            let attachments = null;
            let file=null;
            var fileName=null;
            if(req.files)
            {
                file=req.files.file;
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
            var announcement = {
                type,
                title,
                content,
                date: new Date(),
                attachments,
                createdBy: req.user,
                comments: [],
                submissions: []
            };
            console.log(dueDate);
            if (dueDate) {
                announcement.dueDate = dueDate;
            }
            classroom.announcements.push(announcement);
            await classroom.save();

            //add the assignment and quiz to the course eval evaluations and student eval evaluations
            if (type == 'Assignment' || type == 'Other') {
                const courseEval = CourseEval.findOne({ classCode });

                if (!courseEval) {
                    return res.status(404).json({ message: 'Course eval not found' });
                }

                const evaluation = {
                    title,
                    weightage,
                    totalMarks,
                    averageMarks: 0,
                    maxMarks: 0,
                    minMarks: 0,
                    hasSubmissions: type == 'Assignment' ? true : false,
                    dueDate,
                }

                courseEval.evaluations.push(evaluation);
                await courseEval.save();
            }

            const authorName = await Teacher.findById(req.user).select('name');
            announcement.createdBy = authorName.name;

            await session.commitTransaction();
            res.status(201).json(announcement);
        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        } finally {
            session.endSession();
        }
    },

    editAnnouncement: async (req, res) => {
        try {
            const { classCode, announcementId } = req.params;
            const { title, content, dueDate } = req.body;

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const announcement = classroom.announcements.find(announcement => announcement._id == announcementId);
            if (!announcement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }

            announcement.title = title;
            announcement.content = content;
            announcement.dueDate = dueDate;

            await classroom.save();

            res.status(201).json({ message: 'Announcement edited successfully', announcement });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

    deleteAnnouncement: async (req, res) => {
        try {
            const { classCode, announcementId } = req.params;

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const announcement = classroom.announcements.find(announcement => announcement._id == announcementId);
            if (!announcement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }

            const index = classroom.announcements.indexOf(announcement);
            classroom.announcements.splice(index, 1);

            await classroom.save();

            res.status(201).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    addAttendance: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { classCode } = req.params;
            const { date, duration, attendance } = req.body;

            const courseEval = await CourseEval.findOne({ classCode });
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            courseEval.lectures.push({ date, duration, attendance });
            
            const classroom = await Classroom.findOne({ code: classCode })
                .populate({
                    path: 'students.studentId',
                    select: 'rollNumber'
                });

            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            const students = classroom.students;
            console.log(students);
            if (!students) {
                return res.status(404).json({ message: 'No students found' });
            }

            let studentEvals = await StudentEval.find({ classCode })
            .populate({
                path: 'studentId',
                select: 'rollNumber'
            });

            console.log("eval: ", studentEvals);

            if (!studentEvals) {
                return res.status(404).json({ message: 'No student evals found' });
            }
            
            for(let i = 0; i < studentEvals.length; i++){
                const studentAttendance = attendance.find(student => student.rollNumber == studentEvals[i].studentId.rollNumber);
                console.log("studentAttendance: ", studentAttendance);
                const status = studentAttendance.status;
                studentEvals[i].lectures.push({ date, duration, status });
                await studentEvals[i].save();
                console.log("saved", studentEvals[i]);
            }
            
            await courseEval.save();
            
            // return date, presents, absents
            let attendanceData = {
                date,
                duration,
                presents: attendance.filter(student => student.status === 'P').length,
                absents: attendance.filter(student => student.status === 'A').length
            };
            
            await session.commitTransaction();
            res.status(201).json({ message: 'Attendance added successfully', attendanceData });

        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
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

            const courseEval = await CourseEval.findOne({ classCode });
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            const lecture = courseEval.lectures.find(lecture => new Date(lecture.date).toISOString().split('T')[0] == date);
            if (!lecture) {
                return res.status(404).json({ message: 'Lecture not found' });
            }

            lecture.duration = duration;
            lecture.attendance = attendance;

            let studentEvals = await StudentEval.find({ classCode })
            .populate({
                path: 'studentId',
                select: 'rollNumber'
            });

            if (!studentEvals) {
                return res.status(404).json({ message: 'No student evals found' });
            }

            for(let i = 0; i < studentEvals.length; i++){
                const studentAttendance = attendance.find(student => student.rollNumber == studentEvals[i].studentId.rollNumber);
                const status = studentAttendance.status;
                const studentLecture = studentEvals[i].lectures.find(lecture => new Date(lecture.date).toISOString().split('T')[0] == date);
                if (studentLecture) {
                    studentLecture.status = status;
                    studentLecture.duration = duration;
                    await studentEvals[i].save();
                }
            }

            await courseEval.save();
            await session.commitTransaction();
            res.status(200).json({ message: 'Attendance updated successfully' });

        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        } finally {
            session.endSession();
        }
    },

    getAllAttendance: async (req, res) => {
        try {
            const { classCode } = req.params;

            const courseEval = await CourseEval.findOne({ classCode });
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            const lectures = courseEval.lectures;
            if (!lectures) {
                return res.status(404).json({ message: 'No lectures found' });
            }

            let attendanceData = lectures.map(lecture => {
                const presents = lecture.attendance.filter(student => student.status === 'P').length;
                const absents = lecture.attendance.filter(student => student.status === 'A').length;
                const duration = lecture.duration;

                return {
                    date: lecture.date,
                    duration,
                    presents,
                    absents
                };
            });

            attendanceData = attendanceData.sort((a, b) => new Date(b.date) - new Date(a.date)); // sort by date

            return res.status(200).json(attendanceData);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getAttendance: async (req, res) => {
        try{
            const { classCode, date } = req.params;

            const courseEval = await CourseEval.findOne({ classCode });
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            const lecture = courseEval.lectures.find(lecture => new Date(lecture.date).toISOString().split('T')[0] == date);
            if (!lecture) {
                return res.status(404).json({ message: 'Lecture not found' });
            }

            const attendance = lecture.attendance;
            if (!attendance) {
                return res.status(404).json({ message: 'No attendance found' });
            }

            res.status(200).json(attendance);

        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getFeedback: async (req, res) => {
        
        
        const { classCode } = req.params;
        const classroom = await Classroom.findOne({ code: classCode }).populate({path:'feedback.studentId', select:'name'});
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        const feedback = classroom.feedback;
        if (!feedback) {
            return res.status(404).json({ message: 'No feedback found' });
        }
        res.json(feedback);
        

    },

    getAllEvaluations: async (req, res) => {
        try {
            const { classCode } = req.params;

            const courseEval = CourseEval.findOne( {classCode} );

            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            let evaluations = courseEval.evaluations;

            evaluations.sort((a, b) => {
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

            res.status(200).json( evaluations );
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getEvaluationMarks: async (req, res) => {
        try {
            const { classCode, title } = req.params;

            const courseEval = await CourseEval.findOne( {classCode} );
            if (!courseEval) {
                return res.status(404).json({ message: 'Course eval not found' });
            }

            const evaluation = courseEval.evaluations.find(evaluation => evaluation.title == title);
            if (!evaluation) {
                return res.status(404).json({ message: 'Evaluation not found' });
            }

            const studentEvals = await StudentEval.find({ classCode })
                // .populate({
                //     path: 'studentId',
                //     select: 'rollNumber name'
                // });

            if (!studentEvals) {
                return res.status(404).json({ message: 'No student evals found' });
            }

            let data = studentEvals.map(studentEval => {
                const eval = studentEval.evaluations.find(eval => eval.title == evaluation.title);
                const obtainedMarks = eval ? eval.obtainedMarks : 0;
                const obtainedWeightage = eval ? eval.obtainedWeightage : 0;
                return {
                    studentId: studentEval.studentId,
                    // rollNumber: studentEval.studentId.rollNumber,
                    // name: studentEval.studentId.name,
                    obtainedMarks,
                    obtainedWeightage
                };
            });

            if(evaluation.hasSubmissions){
                const classroom = await Classroom.findOne({ code: classCode });
                if (!classroom) {
                    return res.status(404).json({ message: 'Classroom not found' });
                }

                const assignment = classroom.announcements.find(announcement => announcement.title == title);
                if (!assignment) {
                    return res.status(404).json({ message: 'Assignment not found' });
                }

                const submissions = assignment.submissions;

                data = data.map(student => {
                    const submission = submissions.find(submission => submission.studentId == student.studentId);
                    if(submission){
                        student.submission = submission;
                    }
                    return student;
                });
            }

            res.status(200).json(data);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

    // markAssignment: async (req, res) => {
    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     try{
    //         const {classCode, assignmentId} = req.params;
    //         const {evaluations} = req.body;

    //         const classroom = await Classroom.findOne({code: classCode});
    //         if(!classroom){
    //             return res.status(404).json({message: 'Classroom not found'});
    //         }

    //         const assignment = classroom.announcements.find(announcement => announcement._id == assignmentId);
    //         if(!assignment){
    //             return res.status(404).json({message: 'Assignment not found'});
    //         }

    //         const submission = assignment.submissions.find(submission => submission.studentId == studentId);
    //         if(!submission){
    //             return res.status(404).json({message: 'Submission not found'});
    //         }

    //         submission.grade = grade;

    //         await classroom.save();

    //         await session.commitTransaction();
    //         res.status(200).json({message: 'Assignment marked successfully'});
    //     }catch(error){
    //         await session.abortTransaction();
    //         console.log(error);
    //         res.status(500).json({ message: 'Server error', error });
    //     }finally{
    //         session.endSession();
    //     }
    // },
};

module.exports = teacherController;