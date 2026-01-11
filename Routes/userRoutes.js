const express = require('express');
const router = express.Router();
const authService = require('../Services/authService');
const userService = require('../Services/userService');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { generateToken } = require('../Utils/jwtUtils');

// Auth routes
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;
        await authService.createUser(name, email, password, preferences);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.provideTokenForUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Protected routes
router.get('/preferences', authenticateToken, (req, res) => {
    try {
        const preferences = userService.getUserPreferences(req.user.id);
        if (preferences === null) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ preferences });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/preferences', authenticateToken, (req, res) => {
    try {
        const { preferences } = req.body;
        userService.updateUserPreferences(req.user.id, preferences);
        res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;