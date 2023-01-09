const mongoose = require('mongoose');
/**Permet de transformer les erreurs de type mongodb
 * en instances de Mongoose ValidationErrot
 */
const mongodbErrorHandler = require('mongoose-mongodb-errors');
// Permet de vérifier que l'email est unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);