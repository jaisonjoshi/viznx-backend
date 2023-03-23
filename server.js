import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/middlewares.js";
import adminRouter from "./routes/adminRouter.js";
import morgan from "morgan";
import operatorRouter from "./routes/operatorRouter.js";
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api/admin", adminRouter);
app.use("/api/operator", operatorRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server listen on http://localhost:${PORT}`)
);
