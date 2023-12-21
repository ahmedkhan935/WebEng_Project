const Student = require('../models/Student');
const Course = require('../models/Course');
const Classroom = require('../models/Classroom');
const Semester = require('../models/Semester');
const Degree = require('../models/Degree');
const Thread = require('../models/Thread');

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
            const courseCodes = student.semesters[student.semesters.length - 1].courses.map(course => course.courseCode);// Get the course codes of the last semester
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const student = await Student.findById(req.user);
            const courseCodes = student.semesters.map(semester => semester.courses.map(course => course.courseCode));// Get the course codes of all semesters
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getClasses: async (req, res) => {
        try {
            const student = await Student.findById(req.user);
            const classCodes = student.classes.map(classroom => classroom.classCode);// Get the class codes of all classes
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

    getClass: async (req, res) => {
        try {
            const classroom = await Classroom.findOne({ code: req.params.classCode })
                .populate({
                    path: 'createdBy',
                    select: 'name'
                })
                .populate('announcements')
                .populate({
                    path: 'students.studentId',
                    select: '-password'
                })
                .populate({
                    path: 'teachers.teacherId',
                    select: '-password'
                })
                .populate('courseId');
            res.status(201).json(classroom);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getTodos: async (req, res) => {
        try {
            const student = await Student.findById(req.user);
            const classCodes = student.classes.map(classroom => classroom.classCode); // Get the class codes of all classes
            const classes = await Classroom.find({ code: { $in: classCodes } });

            let todos = [];
            classes.forEach(classroom => {
                classroom.announcements.forEach(announcement => {
                    if ((announcement.type === 'assignment' || announcement.type === 'quiz') && new Date(announcement.dueDate) > new Date()) {
                        todos.push(announcement);
                    }
                });
            }); // Get the todos of all classes

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

    getThreads: async (req, res) => {
        try {
            const student = await Student.findById(req.user)
            .populate('threads.threadId')
            .populate({
              path: 'threads.createdBy',
              select: 'name'
            });
            const threads = student.threads;
            console.log(threads);
            res.status(201).json(threads);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getThread: async (req, res) => {
        try {
            const student = await Student.findById(req.user).populate('threads.threadId');
            const thread = student.threads.filter(thread => thread._id == req.params.threadId);
            res.status(201).json(thread);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },



};

module.exports = studentController;

/*  
*** dummy outputs ***

getClass:
{
  "_id": "6579e2f7aa9576d35e7e86a0",
  "name": "Math 101",
  "code": "MTH101",
  "courseId": {
    "_id": "657a01b97e709377ca8c177e",
    "courseCode": "CS103",
    "courseName": "Algorithms",
    "courseCredits": 3,
    "courseType": "Theory",
    "prereq": [
      {
        "_id": "657e0a72ce1c3b61f966c5e9",
        "courseCode": "CS102"
      }
    ]
  },
  "createdBy": {
    "_id": "657b670cf879b1cc0e82de53",
    "name": "John Doess"
  },
  "teachers": [
    {
      "teacherId": {
        "_id": "657b670cf879b1cc0e82de53",
        "email": "teacher@example12.com",
        "name": "John Doess",
        "CNIC": "12345-1234567-13",
        "contactNumber": "+12345678901",
        "address": "123 Street, City, Country",
        "__v": 0
      },
      "_id": "657e012fcebaaf9b182a5237"
    },
    {
      "teacherId": {
        "_id": "657b72224bf41b025708e8aa",
        "email": "ahmed@teacher.com",
        "name": "Ahmed",
        "CNIC": "111111111",
        "contactNumber": "11111111",
        "address": "dcighuwhfiuwhfiuhiuh",
        "__v": 0
      },
      "_id": "657e012fcebaaf9b182a5238"
    }
  ],
  "students": [
    {
      "studentId": {
        "_id": "657c59f280fccb527ab02f88",
        "email": "ahmed@student.com",
        "name": "Ahmed",
        "rollNumber": "123455",
        "degreeName": "Bachelor of Business Administration",
        "CNIC": "1111111111",
        "contactNumber": "111111111",
        "address": "iirjirjirjfj",
        "semesters": [],
        "classes": [],
        "threads": [],
        "batch": "2022",
        "__v": 0
      },
      "_id": "657e012fcebaaf9b182a5239"
    },
    {
      "studentId": {
        "_id": "657d67eaba43682a970c0f85",
        "email": "student@examples.com",
        "name": "student@examples.com",
        "rollNumber": "12345",
        "degreeName": "Bachelor of Business Administration",
        "CNIC": "11111111",
        "contactNumber": "",
        "address": "fhuhfuihfiuhiuhiu",
        "semesters": [],
        "classes": [
          {
            "_id": "657e0a72ce1c3b61f966c5e7",
            "classCode": "MTH101"
          }
        ],
        "threads": [
          {
            "_id": "657e0a72ce1c3b61f966c5e8",
            "threadId": "657b57ee731537846c52898c"
          }
        ],
        "batch": "2002",
        "__v": 0
      },
      "_id": "657e012fcebaaf9b182a523a"
    }
  ],
  "announcements": [
    {
      "type": "Announcement",
      "title": "New Assignment",
      "content": "Please complete the assignment by next week.",
      "date": "2022-01-01T00:00:00.000Z",
      "attachments": [
        {
          "name": "Assignment1.pdf",
          "url": "http://example.com/Assignment1.pdf",
          "_id": "6579e2f7aa9576d35e7e86a6"
        }
      ],
      "createdBy": "60d1ca3b2b6e330b8e91f5a0",
      "comments": [
        {
          "content": "Can we get an extension?",
          "date": "2022-01-02T00:00:00.000Z",
          "createdBy": "60d1ca3b2b6e330b8e91f5a1",
          "_id": "6579e2f7aa9576d35e7e86a7"
        }
      ],
      "submissions": [
        {
          "studentId": "60d1ca3b2b6e330b8e91f5a2",
          "date": "2022-01-03T00:00:00.000Z",
          "attachments": [
            {
              "name": "Assignment1_Solution.pdf",
              "url": "http://example.com/Assignment1_Solution.pdf",
              "_id": "6579e2f7aa9576d35e7e86a9"
            }
          ],
          "_id": "6579e2f7aa9576d35e7e86a8"
        }
      ],
      "_id": "6579e2f7aa9576d35e7e86a5"
    }
  ],
  "__v": 0
}

*/