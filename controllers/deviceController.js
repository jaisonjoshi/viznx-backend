import expressAsyncHandler from "express-async-handler";
import Device from "../models/DeviceModel.js";
import { generateTokenForDevice } from "../utils/utils.js";

// @desc Device Login
// @access Private

export const deviceLogin = expressAsyncHandler(async (req, res) => {
  const { deviceId, password } = req.body;

  if (!deviceId || !password) {
    return res.status(200).json({ message: "Device fields are required" });
  }

  try {
    const device = await Device.findOne({ deviceId });

    if (device && (await device.matchPassword(password))) {
      const maxAge = 1000 * 60 * 60 * 24 * 365 * 10; // set maxAge to 10 years
      const token = generateTokenForDevice(device._id);
      res.cookie("Viznx_Secure_Device_Session_ID", token, {
        httpOnly: true,
        maxAge: maxAge,
      });

      return res.status(201).json(device.toJSON());
    } else {
      res.status(401);
      throw new Error("invalid password or email");
    }
  } catch (error) {
    throw new Error(error.message ? error.message : "Internal server error ");
  }
});
