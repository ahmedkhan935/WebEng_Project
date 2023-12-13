const mongoose = require('mongoose');

//admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, default: "" },
  password: String,
  
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;