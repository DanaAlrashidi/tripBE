const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
require("dotenv").config();
const hashingPass = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  console.log(process.env.SECRETKEY);
  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "5h" });
  return token;
};

const register = async (req, res, next) => {
  try {
    const hashedPass = await hashingPass(req.body.password);
    req.body.password = hashedPass;
    const newuser = await User.create(req.body);
    const token = generateToken(newuser);
    return res.status(201).json({ token: token });
  } catch (error) {
    console.log("test");
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log("first");
  try {
    // const user = req.user;
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("username");

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ username: req.user.username });
  } catch (error) {
    next(error);
  }
};
module.exports = { login, getAllUsers, getMyProfile, register };
