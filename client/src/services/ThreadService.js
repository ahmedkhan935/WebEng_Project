import {url} from './url';
const BASE_URL = url;
export async function getThreads() {
    return await fetch(`${BASE_URL}/thread`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export async function getThread(id) {
    return await fetch(`${BASE_URL}/thread/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export async function addThread(title) {
    return await fetch(`${BASE_URL}/thread`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({title: title})
    });
}
export async function deleteThread(id) {
    return await fetch(`${BASE_URL}/thread/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export async function updateThread(id, title) {
    return await fetch(`${BASE_URL}/thread/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({title: title})
    });
}
export async function addAnnouncement(id, title, content, attachments) {
    return await fetch(`${BASE_URL}/thread/${id}/announcement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({title: title, content: content, attachments: attachments})
    });
}

export async function deleteAnnouncement(threadId, announcementId) {
    return await fetch(`${BASE_URL}/thread/${threadId}/announcement/${announcementId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export async function updateAnnouncement(threadId, announcementId, title, content, attachments) {
    return await fetch(`${BASE_URL}/thread/${threadId}/announcement/${announcementId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({title: title, content: content, attachments: attachments})
    });
}

export async function viewAnnouncements(id) {
    return await fetch(`${BASE_URL}/thread/${id}/announcement`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
