const mongoose = require('mongoose');

//Teacher Schema
const teacherSchema = new mongoose.Schema({
    email: { type: String, unique: true, default: "" },
    password: String,
    name: String,
    CNIC: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
    contactNumber: { type: String, unique: true, sparse: true }, //sparse: true means that the field is not required
    address: { type: String, default: "" },
    classes: {
        type: [
            {
                classId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Classroom',
                    required: true
                },
            }
        ],
    },
    threads: {
        type: [
            {
                threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }, //Id of the thread as foreign key
            }
        ], default: [],// add main thread id on creation
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;