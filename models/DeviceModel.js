import mongoose from "mongoose";

const DeviceSchema = mongoose.Schema({
  deviceId: {
    type: String,
    require: true,
    unique: [true, "device id is already taken"],
  },
  name: {
    type: String,
    require: true,
  },
  password: { type: String, required: true },
  // total playhours denote the time in minutes the device was on during a day
  totalPlayHrs: { type: Number, default: 0 },
  
  location: { type: String, required: true },
  // adsHistory -> array of ads such that each ad with how much time this device plays and playHrs
  // Should I add operator attr for tracking which operator set this device ?
  morningQueues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Queue" }],
  noonQueues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Queue" }],
  eveningQueues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Queue" }],
  // Device queue: (common to morning,noon and evening queues)
  //      [{
              id:{
                type: ObjectId
              },
              name: {
                type: String
              },
              url: {
                type: String
              },
              operatorName:{
                type:String
              },
              noOfTimesPlayed: {
                type:Number,
                default:0
              },
              startDate: {
                type:Date
              },
              endDate: {
                type:Date
              }


  //      }]
  //

});

DeviceSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
DeviceSchema.pre("save", async function (next) {
  // if not password modified (if an existed device updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Device = mongoose.models.Device || mongoose.model("Device", DeviceSchema);
export default Device;
