"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ENVIRONMENT VARIABLES
const dotenv_1 = __importDefault(require("dotenv"));
// DB
const database_1 = require("./config/database");
// Cookies
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Middlewares
const middlewares_1 = require("./middlewares");
// Routes
const routes_1 = require("./routes");
// Logger & Logging colors
const morgan_1 = __importDefault(require("morgan"));
const colors_1 = __importDefault(require("colors"));
// PATH
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Server
const httpServer = require("http").Server(app);
dotenv_1.default.config({ path: "src/config/config.env" });
// Connect to the DB
(0, database_1.connectDB)();
// Cookies
app.use((0, cookie_parser_1.default)());
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Server logger
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Routes
app.use("/api", routes_1.router);
app.use(middlewares_1.error);
// Listen
const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => {
    console.log(colors_1.default.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});
// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
// Catch un caught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
