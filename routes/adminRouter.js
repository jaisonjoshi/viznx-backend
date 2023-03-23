import { Router } from "express";
import {
  adminLogin,
  adminSignUp,
  createDevice,
  createOperator,
} from "../controllers/adminController.js";
import { isAuthAdmin } from "../middlewares/middlewares.js";

const adminRouter = Router();

// @desc admin creation . NB: there is only one single admin there
// @route POST /api/admin/signup
// @access Public

adminRouter.post("/signup", adminSignUp);

// @desc admin Login
// @route POST /api/admin/login
// @access Private

adminRouter.post("/login", adminLogin);

// @desc create operator
// @route POST /api/admin/create-operator
// @access Private

adminRouter.post("/create-operator", isAuthAdmin, createOperator);

// @desc create device
// @route POST /api/admin/create-device
// @access Private

adminRouter.post("/create-device", isAuthAdmin, createDevice);

export default adminRouter;
