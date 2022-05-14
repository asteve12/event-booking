"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = exports.ReservationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReservationSchema = new mongoose_1.Schema({
    price: {
        type: Number,
        required: [true, "A rezervation must have a price!"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A rezervation must belong to a user!"],
    },
    event: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.ReservationSchema.pre(/^find/, function (next) {
    this.populate("user").populate("event");
    next();
});
exports.Reservation = mongoose_1.model("Reservation", exports.ReservationSchema);
