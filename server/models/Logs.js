const mongoose = require('mongoose');

//Log schema

const logSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String,
    action: String,
    role: String,
    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;