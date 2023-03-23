import expressAsyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/utils.js";

// @desc Register a admin , NB:There is only one admin user here
// @access Private
export const adminSignUp = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(200).json({
      message: "Admin fields are required",
    });
  }

  try {
    const adminData = await Admin.countDocuments({});
    console.log(adminData);
    if (adminData > 0) {
      res.status(400);
      throw new Error("There is already an admin");
    }
    const admin = await Admin.create({
      name,
      email,
      password,
    });
    if (admin) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(admin._id);
      res.cookie("Viznx_Secure_Session_ID", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      });
    } else {
      res.status(400);
      throw new Error("Admin already exists");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc Admin  login
// @access Private

export const adminLogin = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(200).json({
      message: "Admin fields are required",
    });
  }

  try {
    const admin = await Admin.findOne({ email, name });

    if (admin && (await admin.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(admin._id);
      res.cookie("Viznx_Secure_Session_ID", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json(admin.toJSON());
    } else {
      res.status(401).json({ message: "invalid password or email" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
