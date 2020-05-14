const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true }
});

module.exports = mongoose.model('User', UserSchema);