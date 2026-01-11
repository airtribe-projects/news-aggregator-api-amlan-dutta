const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secretkey';
const expiresIn = process.env.JWT_EXPIRES_IN || '15m';

const generateToken = (payload) => {

    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = {
    generateToken,
    verifyToken
};