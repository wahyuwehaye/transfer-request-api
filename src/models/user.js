const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A password is required.'],
        minlength: [8, 'Password must be at least 8 characters.'],

        validate: {
            validator: function(v) {
                return /[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v);
            },
            message: props => 'Password should be alphanumeric!'
        }
    },
    role: {
        type: String,
        enum: ['maker', 'approver', 'admin'],
        required: [true, 'A user role is required.']
    }
});

// Pre-save hook to hash password before saving the user to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();  // Only run this function if password was modified
    this.password = await bcrypt.hash(this.password, 12);  // Hash password with cost of 12
    next();
});

// Method to compare given password with the user's hashed password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
