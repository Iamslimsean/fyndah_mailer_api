"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const logging_1 = __importDefault(require("./src/utils/logging"));
const enum_1 = require("./src/utils/enum");
const router_1 = require("./src/email/router");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const StartServer = () => {
    app.use((req, res, next) => {
        logging_1.default.info(`Incoming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            // Log the Response
            logging_1.default.info(`Incoming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Cors
    app.use((0, cors_1.default)({
        origin: ["https://fyndahmailer.vercel.app"],
        credentials: true,
        methods: ["POST"],
    }));
    // Routes
    app.use("/api/v1", router_1.EmailRouter);
    // Health check
    app.get("/api/v1/healthcheck", (_req, res) => {
        res.status(200).json({ status: "UP 🔥🔧🎂" });
    });
    // Invalid url error handling
    app.use((_req, res) => {
        const _error = new Error("Url not found 😟");
        logging_1.default.error(_error);
        return res.status(404).json({ message: _error.message });
    });
    // Error middleware
    app.use((err, _req, res, _next) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: enum_1.MessageResponse.Error,
                description: "Internal Server Error",
                data: null,
            });
        }
    });
    app.listen(port, () => logging_1.default.info(`Server is running on port ${port} 🔥🔧`));
};
StartServer();
