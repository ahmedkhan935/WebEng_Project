const mongoose = require('mongoose');

//Teacher Schema
const teacherSchema = new mongoose.Schema({
    email: { type: String, unique: true, default: "" },
    password: String,
    name: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;