"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerClass = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CError_1 = require("./util/CError");
const jwtKEY = 'P@ktoLus-Assignment_KEY';
class ControllerClass {
    createUser(req, res, next) {
        try {
            let data = modelUser(req.body);
            const token = jsonwebtoken_1.default.sign(data, jwtKEY, { expiresIn: "1h" });
            res.status(201).json({ token: token });
        }
        catch (error) {
            next(error);
        }
    }
    userData(req, res, next) {
        let user = req.user;
        res.status(200).json(user);
    }
    verifyToken(req, res, next) {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtKEY);
            req.user = decoded;
        }
        catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }
}
exports.ControllerClass = ControllerClass;
function modelUser(body) {
    let data = {};
    if (body.name) {
        data.name = body.name;
    }
    if (body.email) {
        data.email = body.email;
    }
    if (body.phone) {
        data.phone = body.phone;
    }
    if (body.age) {
        data.age = body.age;
    }
    if (Object.keys(data).length)
        return data;
    else
        throw new CError_1.CError('Nothing found in body', 400);
}
