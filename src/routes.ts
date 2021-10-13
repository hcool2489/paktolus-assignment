import express from 'express';
import { ControllerClass } from "./controller";
import { CError } from './util/CError';

export default class RouterClass {
    private controller = new ControllerClass();
    private r = express.Router();
    constructor() {
        this.routeIt();
    }

    public get routes(): express.Router {
        return this.r;
    }

    private routeIt() {
        this.r.post('/user', this.controller.createUser);
        
        this.r.get('/user', this.controller.verifyToken, this.controller.userData);


        this.r.use((req, res, next) => {
            next(new CError('Endpoint Not Found', 404));
        });
    }
}