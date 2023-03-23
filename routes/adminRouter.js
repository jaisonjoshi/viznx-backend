import { Router } from "express";
import { adminLogin, adminSignUp } from "../controllers/adminController.js";

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
// @access access

export default adminRouter;
