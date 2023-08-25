const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    bio: {
        type: String,
        maxlength: 200
    },

}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', userSchema);

module.exports = User