import { Router } from "express";
import { deviceLogin, loadQueues } from "../controllers/deviceController.js";
import { isAuthDevice } from "../middlewares/middlewares.js";

const deviceRouter = Router();

// @desc Device Login
// @route POST /api/device/login
// @access Private

deviceRouter.post("/login", deviceLogin);

// @desc Get all the videos for with respected queues
// @route GET /api/device/load-queues
// @access Private

deviceRouter.get("/load-queues", isAuthDevice, loadQueues);

export default deviceRouter;
