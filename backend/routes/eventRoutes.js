const express = require("express");

const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.uploadForm,
    eventController.createLocation,
    eventController.uploadImageCover,
    eventController.createEvent
  );

router
  .route("/:id")
  .get(eventController.getEvent)
  .delete(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.deleteEvent
  )
  .patch(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.uploadForm,
    eventController.createLocation,
    eventController.deleteOldImage,
    eventController.uploadImageCover,
    eventController.updateEvent
  );

module.exports = router;
