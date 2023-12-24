import axios from "axios";
import { url } from "./url";

const BASE_URL = url;

const handleResponse = async (response) => {
    if (response.status >= 200 && response.status < 300) { //all possible valid (success) status codes
        return { data: response.data };
    } else {
        return { error: response.data.errorMessage };
    }
};
export const getFeedback = async (classCode) => {   
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/feedback`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
}
export const getClasses = async () => {
    const response = await axios.get(`${BASE_URL}/teacher/classes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getClass = async (classCode) => {
    console.log(classCode);
    console.log("GOING TO CLASS ", classCode);
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getThreads = async () => {
    const response = await axios.get(`${BASE_URL}/teacher/threads`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getThread = async (threadId) => {
    const response = await axios.get(`${BASE_URL}/teacher/threads/${threadId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getStudents = async (classCode) => {
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/students`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
}

export const createClassroom = async (classroom) => {
    try {
        const response = await axios.post(`${BASE_URL}/teacher/classroom`,
            {
                name: classroom.name,
                code: classroom.code,
                courseId: classroom.courseId,
                createdBy: classroom.createdBy,
                teachers: classroom.teachers
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
        return handleResponse(response);
    } catch (error) {
        return { error: error.message };
    }
};

export const getProfile = async () => {
    const response = await axios.get(`${BASE_URL}/teacher/profile`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getAllAttendance = async (classCode) => {
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/attendance`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getAttendance = async (classCode, date) => {
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/attendance/${date}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getAllEvaluations = async (classCode) => {
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/evaluations`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const getEvaluationMarks = async (classCode, title) => {
    const response = await axios.get(`${BASE_URL}/teacher/classes/${classCode}/evaluations/${title}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

export const addAnnouncement = async (classCode, formdata) => {
    try {
        const response = await axios.post(`${BASE_URL}/teacher/classes/${classCode}/announcement`,
            formdata,
            {
               
                withCredentials: true
            });
            
        return handleResponse(response);
    } catch (error) {
        return { error: error.message };
    }
};

export const editAnnouncement = async (classCode, announcementId, announcement) => {
    try {
        const response = await axios.put(`${BASE_URL}/teacher/classes/${classCode}/announcement/${announcementId}`,
            {
                type: announcement.type,
                title: announcement.title,
                content: announcement.content,
                dueDate: announcement.dueDate,
                attachments: announcement.attachments
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
        return handleResponse(response);
    } catch (error) {
        return { error: error.message };
    }
};

export const updateAttendance = async (classCode, date, duration, attendance) => {
    const response = await axios.put(`${BASE_URL}/teacher/classes/${classCode}/attendance`,
        {
            date: date,
            duration: duration,
            attendance: attendance
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
    );
    return handleResponse(response);
};

export const deleteAnnouncement = async (classCode, announcementId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/teacher/classes/${classCode}/announcement/${announcementId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
        return handleResponse(response);
    } catch (error) {
        return { error: error.message };
    }
};

export const postComment = async (classCode, announcementId, content) => {
    const response = await axios.post(`${BASE_URL}/teacher/classes/${classCode}/${announcementId}/comment`,
        {
            content: content
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
    );
    return handleResponse(response);
};

export const addAttendance = async (classCode, date, duration, attendance) => {
    const response = await axios.post(`${BASE_URL}/teacher/classes/${classCode}/attendance`,
        {
            date: date,
            duration: duration,
            attendance: attendance
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
    );
    return handleResponse(response);
};