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

export const getClasses = async () => {
    const response = await axios.get(`${BASE_URL}/teacher/classes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return handleResponse(response);
};

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

export const addAnnouncement = async (classCode, announcement) => {
    try {
        const response = await axios.post(`${BASE_URL}/teacher/classroom/${classCode}/announcement`,
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

export const deleteAnnouncement = async (classCode, announcementId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/teacher/classroom/${classCode}/announcement/${announcementId}`,
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