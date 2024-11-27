const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Failed to sign up user" });
    }
};

module.exports = { signup };
