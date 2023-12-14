const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
require('dotenv').config();

const registerStudent = async (req, res) => {
    try {
        const { email, password, name, rollNumber, degreeName, CNIC, contactNumber, address } = req.body;

        // Validation
        if (!email || !password || !name || !rollNumber || !degreeName) {
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
           email: email,
            password: passwordHash,
                name: name,
                rollNumber: rollNumber,
                degreeName: degreeName,
                CNIC: CNIC,
                contactNumber: contactNumber,
                address: address,

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
            password: passwordHash,
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
        const passwordCorrect = await bcrypt.compare(password, existingStudent.password);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        // Sign the token
        const token = jwt.sign(
            {
                user: existingStudent._id,
                email: existingStudent.email,
                role: 'student',
            },
            process.env.JWT_SECRET
        );

        // Send the token in an HTTP-only cookie
        res.status(200).cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        }).send({role: 'student'});
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

        const passwordCorrect = await bcrypt.compare(password, existingTeacher.password);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: 'Wrong email or password.' });
        }

        // Sign the token
        const token = jwt.sign(
            {
                user: existingTeacher._id,
                email: existingTeacher.email,
                role: 'teacher',
            },
            process.env.JWT_SECRET
        );

        res.status(200).cookie('token', token, {
            httpOnly: true,
        }).send({role: 'teacher'});
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = { registerStudent, registerTeacher, loginStudent, loginTeacher };
