// Description: Main entry point for the application
// Used by: Zander Elliott

// Import Express
const express = require('express');

// session middleware
const expressSession = require('express-session');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const db = require('./db/connection');  // Import the Database instance

// env variables
const dotenv = require('dotenv').config();
PORT = process.env.PORT || 3000;
SECRET = process.env.SECRET;
MONGO_URI = process.env.MONGO_URI;

// Create Express app
const app = express();

// Home Route
const homeRouter = require('./routes/home');

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json()); // incoming req body as JSON 
app.use(express.urlencoded({ extended: true })) // incoming requests as form data (strings and arrays)

// Connect to MongoDB with Mongoose
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');

    // Session middleware with connect-mongo
    app.use(expressSession({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
        store: connectMongo.create({
            client: mongoose.connection.client, 
            dbName: 'Rolsa-Technologies',  // Database name for sessions
            collectionName: 'sessions',  // Collection name for sessions
            ttl: 14 * 24 * 60 * 60,  // Time to live (2 weeks)
            autoRemove: 'native',  // Automatically remove expired sessions
            autoRemoveInterval: 10,  // Check for expired sessions every 10 minutes
            touchAfter: 24 * 60 * 60,  // Update session on access after 24 hours
        })
    }));

    // Routes
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
    await mongoose.disconnect();  // Gracefully disconnect mongoose
    process.exit(0);
});
