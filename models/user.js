const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);