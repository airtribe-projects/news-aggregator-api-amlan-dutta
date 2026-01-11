const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/authMiddleware');
const newsService = require('../Services/newsService');
const userService = require('../Services/userService');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const preferences = userService.getUserPreferences(req.user.id);
        if (!preferences) {
            return res.status(404).json({ error: 'User not found' });
        }
        const news = await newsService.getNewsByPreferences(preferences);
        res.status(200).json({ news });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

module.exports = router;