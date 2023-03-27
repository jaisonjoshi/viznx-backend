import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Queue = mongoose.Schema({
  ad: { type: mongoose.Types.ObjectId, ref: "Ad" },
  operator: { type: mongoose.Types.ObjectId, ref: "Operator" },
});

const DeviceSchema = mongoose.Schema({
  deviceId: {
    type: String,
    require: true,
    unique: [true, "device id is already taken"],
    index: true,
  },

  name: {
    type: String,
    require: true,
  },

  password: { type: String, required: true },

  location: { type: String, required: true },

  // Array of objects with ad

  morningQueue: [Queue],
  noonQueue: [Queue],
  eveningQueue: [Queue],
});

DeviceSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

DeviceSchema.methods.toJSON = function () {
  const device = this;
  const deviceObj = device.toObject();
  delete deviceObj.password;
  if (deviceObj.passwordResetToken) delete deviceObj.passwordResetToken;
  if (deviceObj.passwordResetExpires) delete deviceObj.passwordResetExpires;

  return deviceObj;
};

DeviceSchema.pre("save", async function (next) {
  // if not password modified (if an existed device updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Device = mongoose.models.Device || mongoose.model("Device", DeviceSchema);
export default Device;
