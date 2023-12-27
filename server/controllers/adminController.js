const Semester = require("../models/Semester");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Logs = require("../models/Logs");
const Degree = require("../models/Degree");
const Classroom = require("../models/Classroom");
const StudentEval = require("../models/StudentEval");
const CourseEval = require("../models/CourseEval");
const Thread = require("../models/Thread");
const nodemailer = require("nodemailer");

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
    const teachers = await Teacher.find().populate(
      "courses.courseId",
      "courseCode"
    );
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

    // Finding the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Checking if the course ID already exists in the courses array
    const courseExists = teacher.courses.some(
      (course) => course.courseId.toString() === courseId.toString()
    );

    if (courseExists) {
      return res.json({ message: "Course already assigned to the teacher" });
    }

    //Checking if the course is assigned to another teacher
    const teacherWithCourse = await Teacher.findOne({
      "courses.courseId": courseId,
    });

    if (teacherWithCourse) {
      //Removing the course from the other teacher
      const index = teacherWithCourse.courses.findIndex(
        (course) => course.courseId.toString() === courseId.toString()
      );
      teacherWithCourse.courses.splice(index, 1);
      await teacherWithCourse.save();
    }

    //Adding the new course ID to the courses array for the requested teacher
    teacher.courses.push({ courseId });
    await teacher.save();

    return res.status(200).json({ message: "Course added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

//deans list
const deanslist = async (req, res) => {
  try {
    const students = await Student.find({
      "semesters.sgpa": { $gte: 3.5 },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
//rectors list
const rectorslist = async (req, res) => {
  try {
    const students = await Student.find({
      "semesters.sgpa": { $eq: 4 },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
//debar list
const getStudentsWithLowAttendance = async (req, res) => {
  try {
    const studentsEval = await StudentEval.find({
      attendance: { $lt: 80 },
    }).exec();

    if (!studentsEval) {
      return res
        .status(404)
        .json({ errorMessage: "No students found with low attendance" });
    }

    const formattedStudents = [];

    for (const studentEval of studentsEval) {
      var student = await Student.findById(studentEval.studentId);

      for (const classObj of student.classes) {
        const classroom = await Classroom.findOne({ code: classObj.classCode })
          .populate({
            path: "courseId",
            model: "Course",
            select: "courseName",
          })
          .exec();

        if (classroom) {
          formattedStudents.push({
            studentId: student._id,
            name: student.name,
            batch: student.batch,
            degree: student.degreeName,
            attendance: studentEval.attendance,
            courseName: classroom.courseId
              ? classroom.courseId.courseName
              : "Unknown",
          });
        }
      }
    }

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

//medals list
const medalHolderslist = async (req, res) => {
  try {
    const medalTypes = ["gold", "silver", "bronze"];

    const students = await Student.find({}).sort({
      "semesters.sgpa": -1, //descending
    });

    const medalHoldersList = students.reduce((result, student) => {
      student.semesters.sort((a, b) => b.sgpa - a.sgpa); //sort descending

      const degree = student.degreeName;

      // Check if the degree exists in the result object
      if (!result[degree]) {
        result[degree] = [];
      }

      const topStudents = student.semesters
        .slice(0, 3)
        .map((semester, index) => ({
          studentId: student._id,
          rollNo: student.rollNumber,
          studentName: student.name,
          batch: student.batch,
          degree: student.degreeName,
          sgpa: semester.sgpa,
          medalType: semester.sgpa < 1 ? "None" : medalTypes[index],
        }));

      //concatenating the top students to the corresponding degree in the result object
      result[degree] = result[degree].concat(topStudents);

      return result;
    }, {});

    //converting the object into an array of medal holders for each degree
    const finalMedalHoldersList = Object.values(medalHoldersList).reduce(
      (acc, degreeArray) => {
        // Assign medal types based on the position in the sorted array
        degreeArray.forEach((student, index) => {
          student.medalType = medalTypes[index];
        });
        const arr = degreeArray.slice(0, 3);

        return acc.concat(arr);
      },
      []
    );
    console.log(finalMedalHoldersList);
    res.json(finalMedalHoldersList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

//drag and drop add courses to semesters in a particular degree
const saveSemesterCourses = async (req, res) => {
  try {
    const { degreeId, semesters } = req.body;
    console.log(degreeId, semesters);

    const degree = await Degree.findById(degreeId);

    if (!degree) {
      return res.status(404).json({ error: "Degree not found" });
    }

    semesters.forEach((semester) => {
      const existingSemester = degree.semCourses.find((s) => {
        if (s.semNumber == semester.semester) {
          return s;
        }
      });

      if (existingSemester) {
        console.log(existingSemester + "exists for " + semester.semester);
        existingSemester.courses = semester.courses;
        console.log(existingSemester.courses + " courses added");
      } else {
        // Semester doesn't exist, add a new entry (store course IDs)
        degree.semCourses.push({
          semNumber: semester.semester,
          courses: semester.courses.map((course) => ({ courseId: course._id })),
        });
      }
    });

    await degree.save();

    res.status(200).json({ message: "Changes saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDegreeCourses = async (req, res) => {
  try {
    const { degreeId } = req.body;

    // Find the degree by ID
    const degree = await Degree.findById(degreeId);

    if (!degree) {
      return res.status(404).json({ error: "Degree not found" });
    }

    // Extract course IDs for each semester
    const coursesBySemester = degree.semCourses.map((semester) => {
      const courseIds = semester.courses.map((course) => course._id);
      return { semester: semester.semNumber, courseIds };
    });

    console.log(coursesBySemester);
    // Fetch course details for each course ID
    const coursesDetails = await Promise.all(
      coursesBySemester.map(async (semester) => {
        const courses = await Course.find({ _id: { $in: semester.courseIds } });
        return { semester: semester.semester, courses };
      })
    );

    res.status(200).json(coursesDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find({}).select("name abbreviation");
    res.status(200).json(degrees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const createClassrooms = async (newSemesterCourses) => {
  const classrooms = [];

  for (const semesterCourse of newSemesterCourses) {
    const {
      degreeId,
      courseId,
      semesterId,
      teachers,
      students,
      degreeName,
      year,
      semesterName,
    } = semesterCourse;
    const teacherId = teachers[0].teacherId;

    const c = await Course.findById(courseId);
    // Create a new classroom
    const classroom = await Classroom.create({
      name: `${c.courseName}`,
      code: `${c.courseCode}${degreeName}${semesterName}${year}`,
      courseId,
      degreeId,
      semesterId,
      teachers,
      students,
      createdBy: teacherId,
      announcements: [],
      status: "Ongoing",
    });

    classrooms.push(classroom);
    const courseeval = await CourseEval.create({
      classCode: classroom.code,
      lecture: [],
      evaluations: [],
    });
  }

  return classrooms;
};
const startSemester = async (req, res) => {
  try {
    const semesters = await Semester.find({});

    const currentSemester =
      semesters.length > 0 ? semesters[semesters.length - 1] : null;

    if (currentSemester) {
      await Semester.findByIdAndUpdate(currentSemester._id, {
        isCurrent: false,
      });
    }

    // Find the next semester (Fall or Spring)
    const nextSemesterName =
      currentSemester && currentSemester.name === "Fall" ? "Spring" : "Fall";
    var startDate = null;
    var year = null;

    if (nextSemesterName == "Fall") {
      if (currentSemester) {
        year = currentSemester.year;
      } else {
        year = new Date().getFullYear();
      }
      startDate = `1 Sep ${year}`;
    } else {
      let date = new Date();
      date.setFullYear(currentSemester.year + 1);
      year = date.getFullYear();
      startDate = `1 Feb ${year}`;
    }

    //create a new semester with the next semester name
    const newSemester = await Semester.create({
      name: nextSemesterName,
      year: year,
      startDate: new Date(startDate),
      isCurrent: true,
    });

    //setting the new semester as the current semester
    await Semester.findByIdAndUpdate(newSemester._id, { isCurrent: true });

    //collecting course information based on the current semester for each degree
    const degrees = await Degree.find({});
    const newSemesterCourses = [];

    degrees.forEach((degree) => {
      degree.semCourses.forEach((semCourse) => {
        const { semNumber, courses } = semCourse;

        if (
          (nextSemesterName === "Fall" && semNumber % 2 === 1) ||
          (nextSemesterName === "Spring" && semNumber % 2 === 0)
        ) {
          courses.forEach((course) => {
            const courseInfo = {
              degreeId: degree._id,
              degreeName: degree.abbreviation,
              courseId: course._id,
              semesterNumber: semNumber,
              semesterName: nextSemesterName,
              year: newSemester.year,
              semesterId: newSemester._id,
            };

            newSemesterCourses.push(courseInfo);
          });
        }
      });
    });
    // Mapping teachers to the new semester courses
    const teachers = await Teacher.find({});
    teachers.forEach((teacher) => {
      teacher.courses.forEach((teacherCourse) => {
        newSemesterCourses.forEach((semesterCourse) => {
          if (teacherCourse.courseId.equals(semesterCourse.courseId)) {
            semesterCourse.teachers = semesterCourse.teachers || [];
            semesterCourse.teachers.push({ teacherId: teacher._id });
          }
        });
      });
    });

    const students = await Student.find({});

    students.forEach((student) => {
      const studentDegree = student.degreeName;

      // Find the degreeId from the Degree schema based on the degree name
      const degreeId = degrees.find(
        (degree) => degree.name === studentDegree
      )?._id;

      if (degreeId) {
        newSemesterCourses.forEach((semesterCourse) => {
          if (semesterCourse.degreeId.equals(degreeId)) {
            semesterCourse.students = semesterCourse.students || [];
            semesterCourse.students.push({ studentId: student._id });
          }
        });
      }
    });

    // this function creates classrooms for this semester
    const classrooms = await createClassrooms(newSemesterCourses);

    teachers.forEach(async (teacher) => {
      classrooms.forEach((classroom) => {
        classroom.teachers.forEach((classroomTeacher) => {
          if (classroomTeacher.teacherId.equals(teacher._id)) {
            teacher.classes = teacher.classes || [];
            teacher.classes.push({ classCode: classroom.code });
          }
        });
      });
      await teacher.save();
    });

    students.forEach(async (student) => {
      classrooms.forEach((classroom) => {
        classroom.students.forEach(async (classroomstudent) => {
          if (classroomstudent.studentId.equals(student._id)) {
            student.classes = student.classes || [];
            student.classes.push({ classCode: classroom.code });

            const studenteval = await StudentEval.create({
              classCode: classroom.code,
              studentId: student._id,
              evaluations: [],
              lectures: [],
            });
          }
        });
      });

      // Find the last semester of the student
      const lastSemester =
        student.semesters.length > 0
          ? student.semesters[student.semesters.length - 1]
          : null;

      // Check if there is room for a new semester (semester number less than 8)
      if (!lastSemester || lastSemester.semesterNumber < 8) {
        // Increment the semester number
        const nextSemesterNumber = lastSemester
          ? lastSemester.semesterNumber + 1
          : 1;

        // Add a new semester to the student's semesters array
        student.semesters.push({
          semesterNumber: nextSemesterNumber,
          semesterId: newSemester._id,
          totalAttempted: 0,
          totalEarned: 0,
          sgpa: 0.0,
          cgpa: 0.0,
          courses: [],
        });
        console.log(student.semesters);
      }
      await student.save();
    });

    res.json({
      success: true,
      semester: nextSemesterName,
      newSemesterCourses,
      classrooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const endSemester = async (req, res) => {
  try {
    const currentSemester = await Semester.findOne({ isCurrent: true });

    if (!currentSemester) {
      return res
        .status(500)
        .json({ success: false, message: "No semester is in progress" });
    }

    await Semester.findByIdAndUpdate(currentSemester._id, {
      isCurrent: false,
    });

    const classes = await Classroom.find({});
    console.log(classes);

    // Use forEach or for...of to iterate through the classes array
    classes.forEach((c) => {
      if (c.code !== "MET101") c.status = "Completed";
    });
    await Promise.all(classes.map((c) => c.save()));

    res.json({
      success: true,
      classes,
      semester: currentSemester,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: "fb71459@gmail.com",
//     pass: "phph yuzs zwhl wohj",
//   },
// });

// const sendEmail = async (req, res) => {
//   const { to, subject, text } = req.body;
//   console.log(to, subject, text);

//   const mailOptions = {
//     from: "fb71459@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   //sending the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to send email" });
//     } else {
//       console.log("Email sent: " + info.response);
//       res.json({ success: true });
//     }
//   });
// };
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
  getStudentsWithLowAttendance,
  deanslist,
  rectorslist,
  medalHolderslist,
  getDegrees,
  saveSemesterCourses,
  getDegreeCourses,
  startSemester,
  endSemester,
};
