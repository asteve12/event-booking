import { Schema, model, Document, Types, Model } from "mongoose";
import { Event } from "./eventModel.js";

type ID = Types.ObjectId;

interface ReservationInterface extends Document {
  price: number;
  user: ID;
  event: ID;
  createdAt: Date;
  tickets: number;
}

export const ReservationSchema: Schema<ReservationInterface> = new Schema({
  price: {
    type: Number,
    required: [true, "A rezervation must have a price!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A rezervation must belong to a user!"],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "A rezervation must belong to an event!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tickets: {
    type: Number,
    default: 0,
  },
});

ReservationSchema.pre<ReservationInterface>(/^find/, function (next) {
  this.populate("user").populate("event");
  next();
});

export const Reservation: Model<ReservationInterface> = model<ReservationInterface>(
  "Reservation",
  ReservationSchema
);
