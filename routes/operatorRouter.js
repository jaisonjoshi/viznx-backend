import { Router } from "express";
import { operatorLogin } from "../controllers/operatorController.js";

const operatorRouter = Router();

// @desc Operator login
// @route POST /api/operator/login
// @access Private

operatorRouter.post("/login", operatorLogin);

export default operatorRouter;
