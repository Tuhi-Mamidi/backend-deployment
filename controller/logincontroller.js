const Login = require("../model/loginmodel.js");


const register = async (req, res) => {
  try {
    const { username, password,role } = req.body;

    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } 
    const newUser = new Login({ username, password,role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, password,role } = req.body;

    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
  if (user.role !== role) {
      return res.status(403).json({ message: "Access denied: Role mismatch" });
    }
  
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful", user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


const changePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    

    
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password", error: err.message });
  }
};

module.exports = { register, login, changePassword };

