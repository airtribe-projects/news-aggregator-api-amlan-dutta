const users = require('../data/users');

class UserService {
    getUserById(id) {
        return users.find(u => u.id === id);
    }

    getUserPreferences(id) {
        const user = this.getUserById(id);
        return user ? user.preferences : null;
    }

    updateUserPreferences(id, preferences) {
        const user = this.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.preferences = preferences;
        return user;
    }
}

module.exports = new UserService();