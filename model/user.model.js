
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, reuired: true },
  email: { type: String, reuired: true },
    password: { type: String, reuired: true },
    ip_address: { type: String, reuired: true }

},{versionKey:false},
);


const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel}