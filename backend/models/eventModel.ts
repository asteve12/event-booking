import { Schema, model, Document, Model } from "mongoose";
import { Reservation } from "./reservationModel.js";

interface Location {
  city: string;
  venue: string;
}

interface EventInterface extends Document {
  title: string;
  artist: string;
  description: string;
  summary: string;
  startDate: string;
  duration: number;
  ratingsAvg: number;
  ratingsQuantity: number;
  location: Location;
  price: number;
  maxPeople: number;
  participants: number;
  imageCover: string;
}

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "An event must have a title!"],
      unique: true,
    },
    artist: {
      type: String,
      required: [true, "An event must have a title!"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "An event must have a description"],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "An event must have a summary"],
    },
    startDate: {
      type: Date,
      required: [true, "An event must have a start date!"],
    },
    duration: {
      type: Number,
      required: [true, "An event must a duration!"],
    },
    ratingsAvg: {
      type: Number,
      default: 3,
      min: [1, "Rating must be at least 1.0"],
      max: [5, "Rating must be at most 5.0"],
      set: (val: number) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    location: {
      city: String,
      venue: String,
    },
    imageCover: {
      type: String,
      required: [true, "An event must have a cover image"],
    },
    price: {
      type: Number,
      required: [true, "An event must have a price!"],
    },
    maxPeople: Number,
    participants: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

EventSchema.virtual("seatsLeft").get(function (this: EventInterface) {
  const seats = this.maxPeople - this.participants;
  return seats;
});

EventSchema.pre("remove", async function (next) {
  await Reservation.deleteMany({ event: this.id });
  next();
});

export const Event: Model<EventInterface> = model<EventInterface>(
  "Event",
  EventSchema
);
