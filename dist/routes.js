"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const CError_1 = require("./util/CError");
class RouterClass {
    constructor() {
        this.controller = new controller_1.ControllerClass();
        this.r = express_1.default.Router();
        this.routeIt();
    }
    get routes() {
        return this.r;
    }
    routeIt() {
        this.r.post('/user', this.controller.createUser);
        this.r.get('/user', this.controller.verifyToken, this.controller.userData);
        this.r.use((req, res, next) => {
            next(new CError_1.CError('Endpoint Not Found', 404));
        });
    }
}
exports.default = RouterClass;
