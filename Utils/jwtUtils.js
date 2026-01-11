const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'secretkey', { expiresIn: '15m' });
};

module.exports = {
    generateToken
};