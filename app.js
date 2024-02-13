const PORT = 8000;

const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const tripRouter = require("./api/trip/routes");
const connectDB = require("./database");
const userRouter = require("./api/user/routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use("local", localStrategy);

app.use(morgan("dev"));

app.use(userRouter);
app.use("/trip", tripRouter);
passport.use("jwt", jwtStrategy);
connectDB();
app.use("/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: "error", err });
});

app.listen(PORT, () => {
  console.log(`I'm running this server ${PORT}`);
});
