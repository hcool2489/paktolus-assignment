import { User } from './Classes/User';
import jwt from 'jsonwebtoken';
import { CError } from './util/CError';

const jwtKEY = 'P@ktoLus-Assignment_KEY';

export class ControllerClass {

    createUser(req, res, next) {
        try {
            let data = modelUser(req.body);
            const token = jwt.sign(data, jwtKEY, { expiresIn: "1h" });

            res.status(201).json({ token: token });
        } catch (error) {
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
            const decoded = jwt.verify(token, jwtKEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }


}

function modelUser(body: any) {
    let data: User = {};
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
        throw new CError('Nothing found in body', 400);
}