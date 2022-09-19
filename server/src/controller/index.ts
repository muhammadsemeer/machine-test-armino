import { Request, Response, NextFunction } from "express";
import { Controller, IRoute, Methods } from "./controller";

export class IndexController extends Controller {
    path = "/";

    public routerMiddleWares = [];

    routes: IRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: this.index,
        },
    ];

    public index(req: Request, res: Response, next: NextFunction) {
        res.json("Hey Folks, Well Come On board");
    }
}
