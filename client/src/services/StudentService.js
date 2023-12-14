export async function getProfile(userId) {
    return await fetch(`http://localhost:3000/student/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getCourses(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/courses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getAllCourses(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/all-courses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getClasses(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/classes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getTodos(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getNotifications(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getThreads(userId) {
    return await fetch(`http://localhost:3000/student/${userId}/threads`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getThread(userId, threadId) {
    return await fetch(`http://localhost:3000/student/${userId}/threads/${threadId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}