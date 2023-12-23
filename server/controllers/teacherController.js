const Classroom = require('../models/Classroom');
const Thread = require('../models/Thread');
const Teacher = require('../models/Teacher');
const StudentEval = require('../models/StudentEval');
const CourseEval = require('../models/CourseEval');

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
            const classroom = await Classroom.findOne({ code: classCode })
                .populate({
                    path: 'students.studentId',
                    select: 'name rollNumber'
                });

            let students = classroom.students;
            students = students.map(student => {
                return { rollNumber: student.studentId.rollNumber, name: student.studentId.name };
            });

            res.status(201).json({ students });

        } catch (error) {
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
        try {
            const { classCode } = req.params;
            let { type, title, content, dueDate, attachments } = req.body;

            console.log(req.body);

            const classroom = await Classroom.findOne({ code: classCode });
            if (!classroom) {
                return res.status(404).json({ message: 'Classroom not found' });
            }

            console.log("classroom found");
            console.log(req.user);
            
            attachments = attachments ? attachments : [];

            const announcement = {
                type,
                title,
                content,
                date: new Date(),
                dueDate,
                attachments,
                createdBy: req.user,
                comments: [],
                submissions: []
            };

            classroom.announcements.push(announcement);

            await classroom.save();

            res.status(201).json({ message: 'Announcement added successfully', announcement });
        } catch (error) {
            console.log(error);
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

            res.status(200).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    addAttendance: async (req, res) => {
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
            res.status(201).json({ message: 'Attendance added successfully' });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },

    // markAssignment: async (req, res) => {
    //     try{
    //         const {classCode, assignmentId} = req.params;
    //         const {rollNum, grade} = req.body;

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

    //         res.status(200).json({message: 'Assignment marked successfully'});
    //     }catch(error){
    //         res.status(500).json({ message: 'Server error', error });
    //     }
    // }
};

module.exports = teacherController;