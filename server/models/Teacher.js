const mongoose = require('mongoose');

//Teacher Schema
const teacherSchema = new mongoose.Schema({
    email: { type: String, unique: true, default: "" },
    password: String,
    name: String,
    CNIC: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
    contactNumber: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
    address: { type: String, default: "" },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;