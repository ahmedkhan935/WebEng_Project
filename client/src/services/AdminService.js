import { url } from "./url";
const BASE_URL = url;

const handleResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return { error: data.errorMessage };
  }
};
export const viewStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};
export const viewAllStudents = async () => {
  const response = await fetch(`${BASE_URL}/admin/student`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};
export const updateStudent = async (studentId, updatedData) => {
  const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};
export const deleteStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response);
};
export const viewAllTeachers = async () => {
  const response = await fetch(`${BASE_URL}/admin/teacher`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};

export const viewTeacher = async (teacherId) => {
  const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};

export const updateTeacher = async (teacherId, updatedData) => {
  const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

export const deleteTeacher = async (teacherId) => {
  const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response);
};

export const addCourse = async (courseData) => {
  const response = await fetch(`${BASE_URL}/admin/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(courseData),
  });
  return handleResponse(response);
};

export const viewAllCourses = async () => {
  const response = await fetch(`${BASE_URL}/admin/course`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};

export const viewCourse = async (courseId) => {
  const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};

export const updateCourse = async (courseId, updatedData) => {
  const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

export const deleteCourse = async (courseId) => {
  const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response);
};

export async function getLogs() {
  return await fetch(`${BASE_URL}/admin/logs`, {
    method: "GET",
    credentials: "include",
  });
}

export const addDegree = async (degreeData) => {
  const response = await fetch(`${BASE_URL}/admin/degree`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(degreeData),
  });
  return handleResponse(response);
};

export async function viewDegrees() {
  return await fetch(`${BASE_URL}/admin/degree`, {
    method: "GET",
    credentials: "include",
  });
}
export async function getFeedback(id) {
  return await fetch(`${BASE_URL}/admin/feedback/${id}`, {
    method: "GET",
    credentials: "include",
  });
}
export async function getCourseName() {
  return await fetch(`${BASE_URL}/admin/coursename`, {
    method: "GET",
    credentials: "include",
  });
}

export const assignCourse = async (assignCourseData) => {
  const response = await fetch(`${BASE_URL}/admin/assignCourse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(assignCourseData),
  });
  return handleResponse(response);
};

export async function viewDebarList() {
  return await fetch(`${BASE_URL}/admin/lowAttendance`, {
    method: "GET",
    credentials: "include",
  });
}

export async function viewDeansList() {
  return await fetch(`${BASE_URL}/admin/deans`, {
    method: "GET",
    credentials: "include",
  });
}

export async function viewRectorsList() {
  return await fetch(`${BASE_URL}/admin/rectors`, {
    method: "GET",
    credentials: "include",
  });
}

export async function viewMedalHoldersList() {
  return await fetch(`${BASE_URL}/admin/medalHolders`, {
    method: "GET",
    credentials: "include",
  });
}

export const addCoursesToSemestersofDegree = async (DegreeSemestersData) => {
  const response = await fetch(`${BASE_URL}/admin/saveSemesterCourses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(DegreeSemestersData),
  });
  return handleResponse(response);
};

export async function getDegreeCourses(DegreeSemestersData) {
  const response = await fetch(`${BASE_URL}/admin/getDegreeCourses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(DegreeSemestersData),
  });
  return handleResponse(response);
}

export async function getDegrees() {
  return await fetch(`${BASE_URL}/admin/degrees`, {
    method: "GET",
    credentials: "include",
  });
}

//start semester
export async function startSemester() {
  const response = await fetch(`${BASE_URL}/admin/startSemester`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
}

//end semester
export async function endSemester() {
  const response = await fetch(`${BASE_URL}/admin/endSemester`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(response);
}
