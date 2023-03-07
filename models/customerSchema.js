import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import crypto from "crypto";
import isEmail from "validator/lib/isEmail";

const Queue = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  totalPlayHrs: { type: String, default: "0min" },
  totalPlay: { type: Number, required: true, default: 0 },
});

const Device = new mongoose.Schema({
  name: { type: String, required: true },
  totalPlayHrs: { type: Number, required: true, default: "0" },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: isEmail,
  },
  password: { type: String, required: true },
  queue: [Queue],
  devices: [Device],
  passwordResetToken: String,
  passwordResetExpires: Date,
});

CustomerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
CustomerSchema.pre("save", async function (next) {
  // if not password modified (if an existed user updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
export default Customer;
