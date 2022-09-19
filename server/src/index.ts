import { config } from "dotenv";
config();
import express, { RequestHandler, ErrorRequestHandler } from "express";
import logger from "morgan";
import { IndexController } from "./controller";
import { Controller } from "./controller/controller";
import { errorHandler, Handler404 } from "./middlewares/errorHandler";
import { Server } from "./server";

const app = express();
const server = new Server(app, (process.env.PORT as string) || 3001);

const controllers: Controller[] = [new IndexController()];

const globalMiddlewares: RequestHandler[] = [
    express.json(),
    express.urlencoded({ extended: true }),
    logger("dev"),
];

const errorHandlers: Array<RequestHandler | ErrorRequestHandler> = [
    Handler404,
    errorHandler,
];

server.loadGlobalMiddleWares(globalMiddlewares);

server.loadControllers(controllers);

server.loadErrorHandlers(errorHandlers);

server.start();
