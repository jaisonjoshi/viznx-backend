import { Router } from "express";
import {
  addTheAdToQueue,
  operatorLogin,
} from "../controllers/operatorController.js";
import { fetchDevices } from "../controllers/deviceController.js";
import { isAuthOperator } from "../middlewares/middlewares.js";

const operatorRouter = Router();

// @desc Operator login
// @route POST /api/operator/login
// @access Private

operatorRouter.post("/login", operatorLogin);

// @desc create queue by adding the ads to devices
// @route POST /api/operator/create-queue
// @access Private

operatorRouter.post("/create-queue", addTheAdToQueue);

// @desc fetch all the devices
// @route GET /api/operator/load-devices
// @access Private

operatorRouter.get("/load-devices", isAuthOperator, fetchDevices);

export default operatorRouter;
