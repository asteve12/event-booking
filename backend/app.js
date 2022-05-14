const path = require("path");

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const eventRouter = require("./routes/eventRoutes");
const userRouter = require("./routes/userRoutes");
const reservationRouter = require("./routes/reservationRoutes");
const errorHandler = require("./controllers/errorController");

const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.enable("trust proxy");

const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors(corsOptions));

app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000,
  message: "Too many requests from this IP! Please try again in a minute.",
});
app.use("/api", limiter);

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAvg",
      "maxPeople",
      "price",
    ],
  })
);

app.use(compression());

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reservations", reservationRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.use(errorHandler);

module.exports = app;
