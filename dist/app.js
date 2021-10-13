"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(new routes_1.default().routes);
app.use((error, req, res, next) => {
    console.debug(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).send({ error: message });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.info(`Server is listening on port: ${PORT}`);
});
