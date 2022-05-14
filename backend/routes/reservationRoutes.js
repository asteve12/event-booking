const express = require("express");

const authController = require("../controllers/authController");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.use(authController.protectRoute);

router
  .route("/me/")
  .get(
    authController.restrict("user"),
    reservationController.getMyReservations
  );

router
  .route("/:id")
  .get(
    reservationController.checkReservationOwner,
    reservationController.getReservation
  );

router
  .route("/create-rez/:eventId")
  .post(
    authController.restrict("user"),
    reservationController.createReservationDetails,
    reservationController.createReservation
  );

router.use(authController.restrict("admin"));
router.route("/").get(reservationController.getAllReservations);
router
  .route("/:id")
  .patch(reservationController.updateReservation)
  .delete(
    reservationController.deleteReservationTicketsFromEvent,
    reservationController.deleteReservation
  )
  .get(reservationController.getReservation);

module.exports = router;
