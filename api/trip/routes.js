const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/multer");
const {
  getAllTrips,
  getTripById,
  createTrips,
  editTrip,
  deleteTrip,
} = require("./controllers");
const passport = require("passport");

router.get("/", getAllTrips);
router.get("/:tripId", getTripById);

router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  createTrips
);

router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  editTrip
);

router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);

module.exports = router;
