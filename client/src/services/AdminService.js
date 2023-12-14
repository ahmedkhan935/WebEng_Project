import {url} from './url';
const BASE_URL = url;

const handleResponse = async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  };
export const viewStudent = async (studentId) => {
    const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  }
  export const viewAllStudents = async () => {
    const response = await fetch(`${BASE_URL}/admin/student`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  }
  export const updateStudent = async (studentId, updatedData) => {
    const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
    }
    export const deleteStudent = async (studentId) => {
        const response = await fetch(`${BASE_URL}/admin/student/${studentId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return handleResponse(response);
    }
export const viewAllTeachers = async () => {
    const response = await fetch(`${BASE_URL}/admin/teacher`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  
  export const viewTeacher = async (teacherId) => {
    const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  
  export const updateTeacher = async (teacherId, updatedData) => {
    const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
  };
  
  export const deleteTeacher = async (teacherId) => {
    const response = await fetch(`${BASE_URL}/admin/teacher/${teacherId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  
  export const addCourse = async (courseData) => {
    const response = await fetch(`${BASE_URL}/admin/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(courseData),
    });
    return handleResponse(response);
  };
  
  export const viewAllCourses = async () => {
    const response = await fetch(`${BASE_URL}/admin/course`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  
  export const viewCourse = async (courseId) => {
    const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  
  export const updateCourse = async (courseId, updatedData) => {
    const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
  };
  
  export const deleteCourse = async (courseId) => {
    const response = await fetch(`${BASE_URL}/admin/course/${courseId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  };
  