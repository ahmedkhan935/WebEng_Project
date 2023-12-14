
export async function studentlogin(email, password) {
    return await fetch('http://localhost:3000/auth/login/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email: email, password: password }),
    });
}
export async function teacherLogin(email, password) {
    return await fetch('http://localhost:3000/auth/login/teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email: email, password: password }),
    });
}