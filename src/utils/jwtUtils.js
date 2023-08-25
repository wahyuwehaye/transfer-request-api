const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        role: user.role
    }, 'YOUR_SECRET_KEY', { expiresIn: '24h' });  // Replace 'YOUR_SECRET_KEY' with your secret key.
};

const verifyToken = (token) => {
    return jwt.verify(token, 'YOUR_SECRET_KEY');  // Replace 'YOUR_SECRET_KEY' with your secret key.
};

module.exports = {
    generateToken,
    verifyToken
};
