import { Router } from "express";
import { deviceLogin } from "../controllers/deviceController.js";

const deviceRouter = Router();

// @desc Device Login
// @route POST /api/device/login
// @access Private

deviceRouter.post("/login", deviceLogin);

export default deviceRouter;
