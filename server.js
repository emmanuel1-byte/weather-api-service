import express from "express";
import { logger } from "./src/utils/logger.js";
import {
  globalErrorHandler,
  routeNotFoundHandler,
} from "./src/middlewares/error.js";
import weather from "./src/modules/weather/route.js";
const app = express();
const port = 3000 || process.env.PORT;

/**
 * Configures the Express app to trust the proxy server when determining the client's IP address.
 * This is necessary when the app is running behind a reverse proxy (e.g. a load balancer or a CDN).
 * Without this setting, the app would see the proxy's IP address instead of the client's IP address.
 */
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hng Project" });
  console.log(req.ip);
});

app.use("/api", weather);

app.use(globalErrorHandler);
app.use(routeNotFoundHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export default app;