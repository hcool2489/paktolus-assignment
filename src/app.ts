import express from 'express';
import router from "./routes";
import { CError } from './util/CError';

const app = express();
app.use(express.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(new router().routes);

app.use((error: CError, req, res, next) => {
    console.debug(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).send({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    return console.info(`Server is listening on port: ${PORT}`);
});