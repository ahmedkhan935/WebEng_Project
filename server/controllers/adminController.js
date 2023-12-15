const Semester = require("../models/Semester");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");

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
const removeStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }
    res.status(204).send();
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
    const { email, adress, contactNumber } = req.body;
    if (!email && !adress && !contactNumber) {
      throw new Error(
        "Please provide values for email, adress, or contactNumber."
      );
    }

    studentToUpdate.email = email ? email : studentToUpdate.email;
    studentToUpdate.address = adress ? adress : studentToUpdate.address;
    studentToUpdate.contactNumber = contactNumber
      ? contactNumber
      : studentToUpdate.contactNumber;
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
  const { courseCode, courseName, courseCredits, courseType, prereq } =
    req.body;

  if (!courseCode || !courseName || !courseCredits || !courseType) {
    throw new Error(
      "Please provide values for courseCode, courseName, courseCredits, and courseType."
    );
  }

  return {
    courseCode,
    courseName,
    courseCredits,
    courseType,
    prereq,
  };
};
const updateCourse = async (req, res) => {
  try {
    const validatedFields = validateCourseFields(req);
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      validatedFields,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }
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
    res.status(204).send();
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
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message || "Invalid input" });
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
};
