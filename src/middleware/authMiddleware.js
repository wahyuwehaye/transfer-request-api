const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required.' });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists.' });
        }

        // Validate role
        const validRoles = ['maker', 'approver', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).send({ message: 'Invalid role provided.' });
        }

        // Validate password: minimum 8 characters, at least one letter and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: 'Password must be at least 8 characters, contain at least one letter and one number.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).send({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Login user and return JWT
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
