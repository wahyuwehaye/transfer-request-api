const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Register a new user
router.post('/register', authController.registerUser);

// User login
router.post('/login', authController.loginUser);

// Get all users (only accessible to Admin)
router.get('/', roleMiddleware(['admin']), userController.getAllUsers);

// Get a single user's details (could be restricted based on your requirements)
router.get('/:id', userController.getSingleUser);

// Update a user's details
router.put('/update', authController.authenticate, userController.updateUser);

// Delete a user (only accessible to Admin)
router.delete('/:id', roleMiddleware(['admin']), userController.deleteUser);

// Reset password (could be tied with email or OTP validation in a real-world scenario)
router.post('/reset-password', userController.resetPassword);

// Change a user's role (only accessible to Admin)
router.put('/change-role', roleMiddleware(['admin']), userController.changeUserRole);

module.exports = router;
