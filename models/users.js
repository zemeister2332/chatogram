const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const finOrCreate = require('mongoose-find-or-create');

const userSchema = new Schema({
    googleId:{
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String
});
userSchema.plugin(finOrCreate);
module.exports = mongoose.model('users', userSchema);