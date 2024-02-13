const express = require("express");
const passport = require("passport");
const { register, getAllUsers, getMyProfile, login } = require("./controllers");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.post("/register", register);

router.get("/", getAllUsers);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);

module.exports = router;
