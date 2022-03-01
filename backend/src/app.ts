import express, { Application, Request, Response } from "express";
import * as path from "path";
import cors from "cors";

const app: Application = express();
const { PORT = 3030 } = process.env;
const IS_PROD = process.env.NODE_ENV === "production";

// SERVER SETTINGS
app.use(express.json());

if (!IS_PROD) {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3030",
      "http://localhost:3030",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
} else app.use(express.static("public"));

// SET ROUTES
import { formRoutes } from "./api/form/form.route";
app.use("/api/form", formRoutes);
// app.get("/**", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// START SERVER
import logger from "./middleware/logger.middleware";
app.listen(PORT, () =>
  logger.info(
    "Server is running",
    `${IS_PROD ? "Production" : "Development"} mode`,
    `Address: http://localhost:${PORT}`
  )
);
