const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const factory = require("./handlerFactory");
const { Event } = require("../models/eventModel");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3({ params: { Bucket: AWS_BUCKET_NAME } });

exports.createEvent = factory.createOne(Event);
const x = 5;
const multerFilter = (req, file, cb) => {
  // can also use .csv
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload images only.", 400), false);
  }
};

let storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: multerFilter,
});

var storage1 = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "https://s3.amazonaws.com/" + AWS_BUCKET_NAME);
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var uploadSingle = multer({
  //multer settings
  // storage: storage1
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(
        null,
        file.fieldname +
          "-" +
          datetimestamp +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  }),
}).single("file");

exports.uploadForm = upload.single("photo");

exports.createLocation = async (req, res, next) => {
  let city;
  let venue;
  if (req.body.city) {
    city = req.body.city;
  }
  if (req.body.venue) {
    venue = req.body.venue;
  }
  req.body.location = {
    city,
    venue,
  };
  next();
};

const deleteImage = async (fileURL, req, res, next) => {
  const n = fileURL.indexOf("com");
  const fileToBeDeleted = fileURL.substring(n + 4);

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileToBeDeleted,
  };

  s3.deleteObject(params, function (err, data) {
    if (err) {
      return next(new AppError("Could not delete image!"), 400);
    }
    console.log("File deleted successfully.");
  });
};

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("No document found by that ID!", 404));
  }

  await deleteImage(event.imageCover);

  await event.remove();

  res.status(204).json({
    status: "Success",
  });
});

exports.deleteOldImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    next();
  }
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("No document found by that ID!", 404));
  }

  await deleteImage(event.imageCover);

  next();
});

exports.uploadImageCover = catchAsync(async (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    if (req.body.imageCover) {
    }
    const path = require("path");
    const file = req.file;

    let name =
      path.basename(file.originalname) +
      "-" +
      Math.floor(10000000000 + Math.random() * 90000000000) +
      ".jpg";

    const params = {
      ACL: "public-read",
      Bucket: AWS_BUCKET_NAME,
      Key: name,
      Body: file.buffer,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        return next(new AppError("Could not upload image!"), 400);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      req.body.imageCover = data.Location;

      next();
    });
  }
});

exports.getAllEvents = factory.getAll(Event);
exports.updateEvent = factory.updateOne(Event);
exports.getEvent = factory.getOne(Event);
