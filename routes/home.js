// Import Router from express
const { Router } = require('express'); // Import the Router

// Import Routes
const AuthRouter = require('./authRouter.js');

// Create a new Router instance
const homeRouter = Router();

// Use Routes
homeRouter.use('/auth', AuthRouter);

// Home Route
homeRouter.get('/', (req, res) => {
    res.render('Home');
});

// Export the router
module.exports = homeRouter;
