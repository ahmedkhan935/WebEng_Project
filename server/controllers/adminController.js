const Semester = require("../models/Semester");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Logs = require("../models/Logs");
const Degree = require("../models/Degree");
const Classroom = require("../models/Classroom");

const validateSemesterFields = (req) => {
  const { name, year, startDate, endDate, isCurrent } = req.body;

  if (!name || !year || !startDate) {
    throw new Error("Please provide values for name, year, and startDate.");
  }
  if (!isCurrent) {
    isCurrent = true;
  }

  return {
    name,
    year,
    startDate,
    endDate,
    isCurrent,
  };
};

const createSemester = async (req, res) => {
  try {
    const validatedFields = validateSemesterFields(req);
    const semester = new Semester(validatedFields);
    const savedSemester = await semester.save();
    res.status(201).json(savedSemester);
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: error.message || "Invalid input" });
  }
};

const getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ errorMessage: "Semester not found" });
    }
    res.status(200).json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const updateSemesterById = async (req, res) => {
  try {
    const validatedFields = validateSemesterFields(req);
    const semester = await Semester.findByIdAndUpdate(
      req.params.id,
      validatedFields,
      { new: true }
    );
    if (!semester) {
      return res.status(404).json({ errorMessage: "Semester not found" });
    }
    res.status(200).json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const deleteSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) {
      return res.status(404).json({ errorMessage: "Semester not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const markFinished = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndUpdate(
      req.params.id,
      { isCurrent: false, endDate: Date.now() },
      { new: true }
    );
    if (!semester) {
      return res.status(404).json({ errorMessage: "Semester not found" });
    }
    res.status(200).json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
const viewAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
const viewStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const removeStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }
    res.status(200).send({ message: "Student removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentToUpdate = await Student.findById(req.params.id);
    if (!studentToUpdate) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }
    const { email, adress, contactNumber, name } = req.body;
    if (!email && !adress && !contactNumber && !name) {
      throw new Error(
        "Please provide values for email, adress, or contactNumber."
      );
    }

    studentToUpdate.email = email ? email : studentToUpdate.email;
    studentToUpdate.address = adress ? adress : studentToUpdate.address;
    studentToUpdate.contactNumber = contactNumber
      ? contactNumber
      : studentToUpdate.contactNumber;
    studentToUpdate.name = name ? name : studentToUpdate.name;
    const student = await studentToUpdate.save();
    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};

const AddCourse = async (req, res) => {
  try {
    const { courseCode, courseName, courseCredits, courseType, prereqs } =
      req.body;
    if (!courseCode || !courseName || !courseCredits || !courseType) {
      throw new Error(
        "Please provide values for courseCode, courseName, courseCredits, and courseType."
      );
    }
    //check for circular prereq
    if (prereqs) {
      for (const prereq of prereqs) {
        const course = await Course.find({ courseCode: prereq.courseCode });
        if (course.prereq) {
          for (const coursePrereq of course.prereq) {
            if (coursePrereq.courseCode === courseCode) {
              return res
                .status(400)
                .json({ errorMessage: "Circular Prerequisite" });
            }
          }
        }
      }
    }

    const course = new Course({
      courseCode,
      courseName,
      courseCredits,
      courseType,
      prereq: prereqs,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const viewAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const viewCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const validateCourseFields = (req) => {
  const { courseName, courseCredits, prereq } = req.body;

  if (!courseName || !courseCredits) {
    throw new Error("Please provide values for  courseName, courseCredits.");
  }

  return {
    courseName,
    courseCredits,

    prereq,
  };
};
const updateCourse = async (req, res) => {
  try {
    const validatedFields = validateCourseFields(req);
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }
    course.courseName = validatedFields.courseName
      ? validatedFields.courseName
      : course.courseName;
    course.courseCredits = validatedFields.courseCredits
      ? validatedFields.courseCredits
      : course.courseCredits;
    if (validatedFields.prereq) {
      for (const prereq of validatedFields.prereq) {
        const course2 = await Course.findOne({ courseCode: prereq.courseCode });

        if (course2.prereq) {
          for (const coursePrereq of course2.prereq) {
            if (coursePrereq.courseCode === course.courseCode) {
              console.log(coursePrereq.courseCode);
              return res
                .status(400)
                .json({ errorMessage: "Circular Prerequisite" });
            }
          }
        }
      }
    }
    course.prereq = validatedFields.prereq
      ? validatedFields.prereq
      : course.prereq;

    const savedCourse = await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }
    res.status(200).send({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};

const viewAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const addTeacher = async (req, res) => {
  try {
    const { email, password, CNIC, name, contactNumber, address } = req.body;
    if (!email || !password || !CNIC || !name || !contactNumber || !address) {
      throw new Error(
        "Please provide values for email, password, CNIC, name, contactNumber, and address."
      );
    }
    const teacher = new Teacher({
      email,
      password,
      CNIC,
      name,
      contactNumber,
      address,
    });
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const viewTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { email, contactNumber, address } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }
    teacher.email = email ? email : teacher.email;
    teacher.contactNumber = contactNumber
      ? contactNumber
      : teacher.contactNumber;
    teacher.address = address ? address : teacher.address;
    const savedTeacher = await teacher.save();

    res.status(200).json(savedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }
    res.status(200).send({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};

const viewLogs = async (req, res) => {
  try {
    const logs = await Logs.find();
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const addDegree = async (req, res) => {
  try {
    const { name, abbreviation } = req.body;

    if (!name) {
      throw new Error("Please provide values for name ");
    }
    const degree = new Degree({
      name: name,
      abbreviation: abbreviation,
    });
    const saveddegree = await degree.save();
    res.status(201).json(saveddegree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
  }
};

const ViewAllDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find({}).exec();
    console.log(degrees);
    res.status(200).json(degrees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "No degrees" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ code: req.params.id }).populate(
      "feedback.studentId",
      "name"
    );
    if (!classroom) {
      return res.status(404).json({ errorMessage: "Classroom not found" });
    }
    const feedback = classroom.feedback;

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
const getCoursename = async (req, res) => {
  try {
    const course = await Classroom.find().select("code name");
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const assignCourse = async (req, res) => {
  try {
    const { teacherId, courseId } = req.body;
    console.log(teacherId, courseId);

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if the course ID already exists in the courses array
    const courseExists = teacher.courses.some(
      (course) => course.courseId.toString() === courseId.toString()
    );

    if (!courseExists) {
      // Add the new course ID to the courses array
      teacher.courses.push({ courseId });

      await teacher.save();
      return res.status(200).json({ message: "Course added successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Course already exists for the teacher" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

module.exports = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemesterById,
  deleteSemesterById,
  markFinished,
  viewAllStudents,
  removeStudent,
  viewStudent,
  updateStudent,
  AddCourse,
  viewAllCourses,
  viewCourse,
  updateCourse,
  deleteCourse,
  viewAllTeachers,
  addTeacher,
  viewTeacher,
  updateTeacher,
  deleteTeacher,
  viewLogs,
  getFeedback,
  getCoursename,
  assignCourse,
  addDegree,
  ViewAllDegrees,
};
