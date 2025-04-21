// Description: Main entry point for the application

// Import Express
const express = require('express');

// session middleware
const expressSession = require('express-session');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');

// env variables
require('dotenv').config();
PORT = process.env.PORT || 3000;
SECRET = process.env.SECRET;
MONGO_URI = process.env.MONGO_URI;

// Create Express app
const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json()); // incoming req body as JSON
app.use(express.urlencoded({ extended: true })); // incoming requests as form data (strings and arrays)

// Connect to MongoDB with Mongoose
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');

    // **Apply session middleware BEFORE routes**
    app.use(expressSession({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, // 2 weeks
        store: connectMongo.create({
            client: mongoose.connection.client,
            dbName: 'Rolsa-Technologies',
            collectionName: 'sessions',
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native',
            autoRemoveInterval: 10,
            touchAfter: 24 * 60 * 60,
        })
    }));

    // Import Routes **AFTER** session is applied
    const homeRouter = require('./routes/homeRoute');
    const AuthRouter = require('./routes/authRouter.js');
    const CarbonCheckRouter = require('./routes/carbonCheckRoute.js');
    const GreenStoriesRouter = require('./routes/greenStoriesRoute.js');
    const SolarConsultationRouter = require('./routes/solarConsultationRoute.js');

    // Use Routes
    app.use('/auth', AuthRouter);
    app.use('/carbonCheck', CarbonCheckRouter);
    app.use('/greenStories', GreenStoriesRouter);
    app.use('/solarConsultation', SolarConsultationRouter);
    app.use('/', homeRouter);

    // Listen on port
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });

}).catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
});

// Ctrl + C Shutdown
process.on("SIGINT", async () => {
    console.log("Closing MongoDB Connection");
    await mongoose.disconnect();
    process.exit(0);
});
