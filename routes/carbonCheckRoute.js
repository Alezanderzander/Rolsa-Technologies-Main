const express = require('express');
const router = express.Router();

// Route: Carbon Check
router.post('/', (req, res) => {
    try {
        res.send('This is the Carbon Check endpoint');
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

router.get('/', (req, res) => {

    const user = req.session ? req.session.user : null;

    res.render('carbonCheck', { title: 'Carbon Check Page', user: user });
    
});

module.exports = router;