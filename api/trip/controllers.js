const Trip = require("../../models/Trip");

const getAllTrips = async (req, res, next) => {
  try {
    const allTrips = await Trip.find();
    return res.status(201).json(allTrips);
  } catch (error) {
    next(error);
  }
};

const createTrips = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    const trip = await Trip.create(req.body);

    return res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

const editTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);

    if (trip.user.equals(req.user._id)) {
      await trip.updateOne(req.body);
      return res.status(204).end();
    } else {
      return res.status(401).json({ message: "You are not the trip owner!" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);

    if (!trip) return res.status(404).json({ message: "trip not found" });

    if (trip.user.equals(req.user._id)) {
      await trip.deleteOne();
      return res.status(204).end();
    } else {
      return res.status(401).json({ message: "You are not the trip owner!" });
    }
  } catch (error) {
    next(error);
  }
};
const getTripById = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    return res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTrips,
  createTrips,
  editTrip,
  deleteTrip,
  getTripById,
};
