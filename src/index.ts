import { ErrorMiddleware } from "@middlewares/error.middleware";
import cors from "cors";
import dateFormat from "date-format";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import "reflect-metadata";
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
  return res.status(200).send(`
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #333; /* dark gray background */
        }
        .message {
          color: #fff; /* white text color */
          font-size: 36px;
          font-weight: bold;
        }
        .message a:link,
        .message a:visited {
          /* added this to target the link */
          color: #0074D9; /* blue link color */
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="message">
        🚀 Welcome to the Memoer API!<br>
        Please visit <a href="./docs/">/docs</a> to see the documentation 📚<br> and test the endpoints
      </div>
    </body>
  </html>
`);
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
