import { url } from './url';

const BASE_URL = url;

export async function studentlogin(email, password) {
    return await fetch(`${BASE_URL}/auth/login/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    });
}

export async function teacherLogin(email, password) {
    return await fetch(`${BASE_URL}/auth/login/teacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
    });
}

export async function studentRegister(email, password, name, rollNo, CNIC, address, contactNumber, degreeName) {
    return await fetch(`${BASE_URL}/auth/register/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password, name: name, rollNumber: rollNo, CNIC: CNIC, address: address, contactNumber: contactNumber, degreeName: degreeName })
    });
}

export async function teacherRegister(email, password, name, CNIC, address, contactNumber) {
    return await fetch(`${BASE_URL}/auth/register/teacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password, name: name, CNIC: CNIC, address: address, contactNumber: contactNumber })
    });
}
export async function logout() {
    return await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
