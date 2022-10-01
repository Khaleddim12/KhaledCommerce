import express from "express";

// ENVIRONMENT VARIABLES
import dotenv from "dotenv";

// DB
import { connectDB } from "./config/database";

// Cookies
import cookies from "cookie-parser";

// Middlewares
import { error } from "./middlewares";

// Routes
import {router} from "./routes";

// Logger & Logging colors
import morgan from "morgan";
import colors from "colors";

// PATH
import path from "path";

const app = express();

// Server
const httpServer = require("http").Server(app);

dotenv.config({ path: "src/config/config.env" });

// Connect to the DB
connectDB();

// Cookies
app.use(cookies());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Server logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api", router);

app.use(error);

// Listen
const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

// Catch un caught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
