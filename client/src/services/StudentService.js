import axios from "axios";
import { url } from "./url";

const BASE_URL = url;

const handleResponse = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    //all possible valid (success) status codes
    return { data: response.data };
  } else {
    return { error: response.data.errorMessage };
  }
};

export const getProfile = async () => {
  const response = await axios.get(`${BASE_URL}/student/profile`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getCourses = async () => {
  const response = await axios.get(`${BASE_URL}/student/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/student/allCourses`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getClasses = async () => {
  const response = await axios.get(`${BASE_URL}/student/classes`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getClass = async (classCode) => {
  console.log(classCode);
  console.log("GOING TO CLASS ", classCode);
  const response = await axios.get(`${BASE_URL}/student/classes/${classCode}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getAllTodos = async () => {
  const response = await axios.get(`${BASE_URL}/student/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getTodos = async (classCode) => {
  const response = await axios.get(`${BASE_URL}/student/todos/${classCode}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getNotifications = async () => {
  const response = await axios.get(`${BASE_URL}/student/notifications`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getThreads = async () => {
  const response = await axios.get(`${BASE_URL}/student/threads`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getThread = async (threadId) => {
  const response = await axios.get(`${BASE_URL}/student/threads/${threadId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const postComment = async (classCode, announcementId, content) => {
  const response = await axios.post(
    `${BASE_URL}/student/classes/${classCode}/${announcementId}/comment`,
    {
      content: content,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return handleResponse(response);
};
