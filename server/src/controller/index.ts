import { Request, Response, NextFunction } from "express";
import { Controller, IRoute, Methods } from "./controller";

const products = [
    {
        id: 1,
        title: "Notebook",
        image: "https://m.media-amazon.com/images/I/41e3YGKg-3L.jpg",
        price: 100,
        offers: [
            {
                key: "total",
                value: 500,
                condition: ">=",
                benefit: "discount",
                percent: 60,
                max: 60,
            },
        ],
    },
    {
        id: 2,
        title: "Sanitizer",
        image: "https://m.media-amazon.com/images/I/31hP17VT5FS._SY450_.jpg",
        price: 250,
        offers: [
            {
                key: "total",
                value: 3000,
                condition: ">",
                benefit: "flatDiscount",
                discount: "1000",
            },
        ],
    },
    {
        id: 3,
        title: "Bag",
        image: "https://m.media-amazon.com/images/I/81IiFRUxeWL._UL1500_.jpg",
        max: 2,
        price: 1500,
        offers: [],
    },
];

export class IndexController extends Controller {
    path = "/";

    public routerMiddleWares = [];

    routes: IRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: this.index,
        },
        {
            path: "/products",
            method: Methods.GET,
            handler: this.getProducts,
        },
    ];

    public index(req: Request, res: Response) {
        res.json("Hey Folks, Well Come On board");
    }

    public getProducts(req: Request, res: Response, next: NextFunction) {
        return res.json({
            products: products.map(({ offers, max, ...rest }) => ({
                ...rest,
            })),
        });
    }
}
