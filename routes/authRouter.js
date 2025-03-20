const express = require('express');

const router = express.Router();

// Example route: Login
router.post('/login', (req, res) => {
    res.send('this is the login endpoint');
});


module.exports = router;