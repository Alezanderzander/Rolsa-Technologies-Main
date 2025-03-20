// Import Packages
require("dotenv").config();
const mongoose = require("mongoose");

// Database Connection
class Database {
    constructor(){
        this.MONGO_URI = process.env.MONGO_URI;
        this.config = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    };


    // Connection Events
    async connect() {
        try {
            await mongoose.connect(this.MONGO_URI, this.config);
            console.log("Database connected successfully");
            this.handleEvents();
        } catch (err) {
            console.error("MongoDB Connection Error:", err);
            process.exit(1);
        }
    };

    // Event Handlers
    handleEvents() {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        mongoose.connection.on("open", () => {
            console.log("MongoDB connection is open");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB Reconneted");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB Connection Error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.error("Disconnected from MongoDB");
        });

        mongoose.connection.on("close", () => {
            console.error("MongoDB Connection Closed");
        });
        

    };

    async disconnect() {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected"); 
    } catch (err) {
        console.error("MongoDB Disconnection Error:", err);
        process.exit(1);
    }

};

// Export Database Connection
module.exports = new Database();