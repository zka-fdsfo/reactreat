const user = require("../model/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
async function register(req, res) {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await user.create({ name, email, password: hashedPassword });
  const refreshToken = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  console.log(newUser);
  console.log("refreshToken:", refreshToken);
  res.status(201).json({ message: "User created successfully", user: newUser, refreshToken: refreshToken });
}

async function login(req, res) {
  const { email, password } = req.body; 
    if (!email || !password) {  
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const refreshToken = jwt.sign(
        {
            id: existingUser._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );
    const accessToken = jwt.sign(
        {
            id: existingUser._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        },
    );
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(existingUser);
    console.log("refreshToken:", refreshToken);
    res.status(200).json({ message: "Login successful", user: existingUser, refreshToken: refreshToken });
}

module.exports = { register, login };