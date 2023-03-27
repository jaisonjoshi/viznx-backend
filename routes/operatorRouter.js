import { Router } from "express";
import {
  addTheAdToQueue,
  operatorLogin,
} from "../controllers/operatorController.js";
import { isAuthOperator } from "../middlewares/middlewares.js";

const operatorRouter = Router();

// @desc Operator login
// @route POST /api/operator/login
// @access Private

operatorRouter.post("/login", operatorLogin);

// @desc create queue by adding the ads to devices
// @route POST /api/operator/create-queue
// @access Private

operatorRouter.post("/create-queue", isAuthOperator, addTheAdToQueue);

export default operatorRouter;
