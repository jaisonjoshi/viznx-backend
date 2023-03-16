import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const OperatorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: isEmail,
  },
  password: { type: String, required: true },
  location: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

OperatorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
OperatorSchema.pre("save", async function (next) {
  // if not password modified (if an existed user updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

OperatorSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Operator =
  mongoose.models.Operator || mongoose.model("Operator", OperatorSchema);
export default Operator;
