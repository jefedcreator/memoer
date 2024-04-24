import "reflect-metadata";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import cors from "cors";
import dateFormat from "date-format";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { config } from "./config/index";
import BaseRouter from "./routes/index";

const swaggerDoc = YAML.load("src/docs/swagger.yaml");

morgan.token("time", () =>
  dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date())
); 


const app = express();
const PORT = config.port || 8081;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  morgan(
    "[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"
  )
);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "WELCOME",
  });
});

app.use("/", BaseRouter);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use((req, res, next) => {
  next(createError(404));
});

app.use(ErrorMiddleware);

app.listen(PORT, () =>
  console.log(`Memoer server started on port http://0.0.0.0:${PORT}`)
);

export default app;
