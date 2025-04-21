const express = require('express');

const router = express.Router();

// Route: Login
router.post('/', (req, res) => {
    try {
        res.send('This is the login endpoint');
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

router.post('/register', (req, res) => {
    try {
        res.send('Sign-up endpoint');
    } catch (error) {
        res.status(500).send('An error occurred during registration');
    }
});

router.get('/', (req, res) => {

    const user = req.session ? req.session.user : null;

    res.render('auth/auth', { title: 'Account Page', user: req.session.user });
});

module.exports = router;