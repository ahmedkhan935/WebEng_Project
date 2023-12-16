// export async function getProfile(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getCourses(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/courses`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getAllCourses(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/all-courses`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getClasses(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/classes`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getTodos(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/todos`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getNotifications(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/notifications`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getThreads(userId) {
//     return await fetch(`http://localhost:3000/student/${userId}/threads`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// export async function getThread(userId, threadId) {
//     return await fetch(`http://localhost:3000/student/${userId}/threads/${threadId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });
// }

// import axios from 'axios';

// const port = 3000;

// export async function getProfile() {
//     return await axios.get(`http://localhost:${port}/student/profile`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getCourses() {
//     return await axios.get(`http://localhost:${port}/student/courses`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getAllCourses() {
//     return await axios.get(`http://localhost:${port}/student/allCourses`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getClasses() {
//     return await axios.get(`http://localhost:${port}/student/classes`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getTodos() {
//     return await axios.get(`http://localhost:${port}/student/todos`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getNotifications() {
//     return await axios.get(`http://localhost:${port}/student/notifications`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getThreads() {
//     return await axios.get(`http://localhost:${port}/student/threads`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

// export async function getThread(threadId) {
//     return await axios.get(`http://localhost:${port}/student/threads/${threadId}`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         withCredentials: true
//     });
// }

import axios from 'axios';
import { url } from './url';

const BASE_URL = url;

const handleResponse = async (response) => {
    if (response.status >= 200 && response.status < 300) { //all possible valid (success) status codes
        return { data: response.data };
    } else {
        return { error: response.data.errorMessage };
    }
};

export const getProfile = async () => {
    const response = await axios.get(`${BASE_URL}/student/profile`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getCourses = async () => {
    const response = await axios.get(`${BASE_URL}/student/courses`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getAllCourses = async () => {
    const response = await axios.get(`${BASE_URL}/student/allCourses`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getClasses = async () => {
    const response = await axios.get(`${BASE_URL}/student/classes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getTodos = async () => {
    const response = await axios.get(`${BASE_URL}/student/todos`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getNotifications = async () => {
    const response = await axios.get(`${BASE_URL}/student/notifications`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getThreads = async () => {
    const response = await axios.get(`${BASE_URL}/student/threads`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getThread = async (threadId) => {
    const response = await axios.get(`${BASE_URL}/student/threads/${threadId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};