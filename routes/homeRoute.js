const { Router } = require('express');
const homeRouter = Router();

// Home Route
homeRouter.get('/', (req, res) => {
    try {
        res.render('Home.ejs');
    } catch (error) {
        res.status(500).send('An error occurred while rendering the Home page');
    }
});

// Export the router
module.exports = homeRouter;