const { Event } = require("../models/eventModel");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { Reservation } = require("../models/reservationModel");
const factory = require("./handlerFactory");

exports.createReservationDetails = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return next(new AppError("No such event!", 404));
  }

  req.body.event = event;
  req.body.user = req.user;
  req.body.price = event.price;

  event.participants = req.body.tickets + event.participants;

  await event.save();

  next();
});

exports.deleteReservationTicketsFromEvent = catchAsync(
  async (req, res, next) => {
    const reservation = await Reservation.findById(req.params.id);

    const event = await Event.findById(reservation.event._id);

    event.participants = event.participants - reservation.tickets;
    await event.save();

    console.log(reservation);
    console.log(event);

    next();
  }
);

exports.createReservation = factory.createOne(Reservation);

exports.updateReservation = factory.updateOne(Reservation);
exports.deleteReservation = factory.deleteOne(Reservation);
exports.getReservation = factory.getOne(Reservation);
exports.getAllReservations = factory.getAll(Reservation);

exports.getMyReservations = catchAsync(async (req, res, next) => {
  const docs = await Reservation.find({ user: req.user._id });

  res.status(200).json({
    status: "Success",
    result: docs.length,
    data: docs,
  });
});

exports.checkReservationOwner = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    const rez = await Reservation.findById(req.params.id);
    if (rez.user._id.toString() !== req.user.id) {
      return next(
        new AppError("Rezervation does not belong to this user!"),
        401
      );
    }
    next();
  }
});
