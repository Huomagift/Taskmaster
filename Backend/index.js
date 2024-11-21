//set up dotenv
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

//set up express
const express = require("express");
app = express();

//set up port (hidden)
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/dbCon");
connectDB();

//connect to database
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
