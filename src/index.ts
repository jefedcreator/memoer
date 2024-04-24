import "reflect-metadata";

import { ErrorMiddleware } from "@middlewares/error.middleware";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import { config } from "./config/index";
import BaseRouter from "./routes/index";

const app = express();
const PORT = config.port || 8081;


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "WELCOME",
  });
});

app.use("/", BaseRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(ErrorMiddleware);

app.listen(PORT, () =>
  console.log(`Memoer server started on port http://0.0.0.0:${PORT}`)
);

export default app;
