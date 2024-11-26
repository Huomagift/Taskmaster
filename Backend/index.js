//set up dotenv
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const taskRoutes = require('./routes/taskRoutes');

//set up express
const express = require("express");
app = express();
app.use(express.json());

//set up port (hidden)
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/dbCon");
connectDB();

//routes
app.use('/api', taskRoutes);

//connect to database
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
