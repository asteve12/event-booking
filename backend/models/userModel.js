"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name!"],
    },
    email: {
        type: String,
        required: [true, "A user must have an email!"],
        unique: true,
        validate: [validator_1.default.isEmail, "Please provide a valid e-mail"],
    },
    password: {
        type: String,
        required: [true, "A user must have a password!"],
        select: false,
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, "A user must have a confirmed password!"],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Please confirm your password!",
        },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});
exports.UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    this.passwordConfirm = "undefined";
    next();
});
exports.UserSchema.methods.checkPassword = async function (enteredPassword, userPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, userPassword);
};
exports.UserSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
exports.User = mongoose_1.model("User", exports.UserSchema);
