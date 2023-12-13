const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
require('dotenv').config();

const registerStudent = async (req, res) => {
    try {
        const { email, password, name, rollNumber, degreeId, CNIC, contactNumber, address } = req.body;

        // Validation
        if (!email || !password || !name || !rollNumber || !degreeId) {
            return res.status(400).json({ errorMessage: 'Please enter all required fields.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ errorMessage: 'Please enter a password of at least 6 characters.' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ errorMessage: 'An account with this email already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save a new student account to the database
        const newStudent = new Student({
            email,
            passwordHash,
            name,
            rollNumber,
            degreeId,
            CNIC,
            contactNumber,
            address,
        });

        const savedStudent = await newStudent.save();

        // Sign the token
        res.status(201).json(savedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

const registerTeacher = async (req, res) => {
    try {
        const { email, password, name, CNIC, contactNumber, address } = req.body;

        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ errorMessage: 'Please enter all required fields.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ errorMessage: 'Please enter a password of at least 6 characters.' });
        }

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ errorMessage: 'An account with this email already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save a new teacher account to the database
        const newTeacher = new Teacher({
            email,
            passwordHash,
            name,
            CNIC,
            contactNumber,
            address,
        });

        const savedTeacher = await newTeacher.save();

        // Sign the token
        res.status(201).json(savedTeacher);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ errorMessage: 'Please enter all required fields.' });
        }

        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        const passwordCorrect = await bcrypt.compare(password, existingStudent.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        // Sign the token
        const token = jwt.sign(
            {
                user: existingStudent._id,
                email: existingStudent.email,
            },
            process.env.JWT_SECRET
        );

        // Send the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ errorMessage: 'Please enter all required fields.' });
        }

        const existingTeacher = await Teacher.findOne({ email });
        if (!existingTeacher) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        const passwordCorrect = await bcrypt.compare(password, existingTeacher.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        // Sign the token
        const token = jwt.sign(
            {
                user: existingTeacher._id,
                email: existingTeacher.email,
            },
            process.env.JWT_SECRET
        );

        // Send the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = { registerStudent, registerTeacher, loginStudent, loginTeacher };