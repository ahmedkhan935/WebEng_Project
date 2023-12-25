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

export const getAllEvaluations = async () => {
  const response = await axios.get(`${BASE_URL}/student/evaluations`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getEvaluations = async (classCode) => {
  const response = await axios.get(`${BASE_URL}/student/evaluations/${classCode}`, {
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

export const getAllAttendance = async () => {
  const response = await axios.get(`${BASE_URL}/student/attendance`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
};

export const getAttendance = async (classCode) => {
  const response = await axios.get(`${BASE_URL}/student/attendance/${classCode}`, {
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

export const submitAssignment = async (classCode, title, formData) => {
  const response = await axios.post(
    `${BASE_URL}/student/classes/${classCode}/assignments/${title}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return handleResponse(response);
}

export const givefeedback = async (classCode, feedback) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/student/class/${classCode}/feedback`,
      {
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    return handleResponse(response);

  }
  catch (err) {
    console.log(err);
    return { error: err.message };
  }

}
export const getMeetLink = async (classCode) => {
  const response = await axios.get(`${BASE_URL}/student/classes/${classCode}/getMeet`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return handleResponse(response);
}
