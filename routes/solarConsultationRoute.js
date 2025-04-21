const express = require('express');

const router = express.Router();

// Route: Solar Consultation
router.post('/', (req, res) => {
    try {
        res.send('This is the Solar Consultation endpoint');
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

router.get('/', (req, res) => {

    const user = req.session ? req.session.user : null;

    res.render('solarConsultation', { title: 'Solar Consultation Page', user: req.session.user });
});

module.exports = router; 