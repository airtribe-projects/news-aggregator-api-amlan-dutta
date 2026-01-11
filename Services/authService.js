const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/jwtUtils');
const users = require('../data/users');

class AuthService {
    async createUser(name, email, password, preferences = []) {
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword,
            preferences
        };
        users.push(user);
        return user;
    }

    async authenticateUser(email, password) {
        const user = users.find(u => u.email === email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    async provideTokenForUser(email, password) {
        const user = await this.authenticateUser(email, password);
        return generateToken({ id: user.id, email: user.email });
    }
}

module.exports = new AuthService();