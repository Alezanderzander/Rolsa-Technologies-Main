const express = require('express');
const router = express.Router();

// Route: Green Stories
router.post('/', (req, res) => {
    try {
        res.send('This is the Green Stories endpoint');
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

router.get('/', (req, res) => {

    const user = req.session ? req.session.user : null;

    console.log("Session Data:", req.session); 

    res.render('greenStories', { title: 'Green Stories Page', user: req.session.user });
});



module.exports = router;