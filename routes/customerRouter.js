import { Router } from "express";
import {
  customerLogin,
  customerSignUp,
} from "../controllers/customerController.js";

const customerRouter = Router();

// @desc customer signup
// @route POST /api/customer/signup
// @access Private

customerRouter.post("/signup", customerSignUp);

// @desc customer Login
// @route POST /api/customer/login
// @access Private

customerRouter.post("/login", customerLogin);

export default customerRouter;
