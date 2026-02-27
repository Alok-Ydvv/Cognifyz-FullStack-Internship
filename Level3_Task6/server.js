require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/internDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

const SECRET = process.env.SECRET;

// ✅ REGISTER
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.json({ message: "User Registered Successfully" });
});

// ✅ LOGIN
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

    res.json({ token });
});

// ✅ AUTH MIDDLEWARE
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).json({ message: "Invalid Token" });
    }
}

// ✅ PROTECTED ROUTE
app.get("/api/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to Protected Dashboard" });
});

// ✅ Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});