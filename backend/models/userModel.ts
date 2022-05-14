import crypto from "crypto";

import { Document, Schema, model, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  createResetPasswordToken(): string;
}

export const UserSchema: Schema<UserInterface> = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid e-mail"],
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
      validator: function (this: UserInterface, val: String): boolean {
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

UserSchema.pre("save", async function (this: UserInterface, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password as string, 12);
  this.passwordConfirm = "undefined";

  next();
});

UserSchema.methods.checkPassword = async function (
  enteredPassword: string,
  userPassword: string
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

UserSchema.methods.createResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken! = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

export const User: Model<UserInterface> = model<UserInterface>(
  "User",
  UserSchema
);
