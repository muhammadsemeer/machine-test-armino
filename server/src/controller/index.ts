import { Request, Response, NextFunction } from "express";
import redisClient from "../config/redis";
import ErrorHandler from "../utils/error";
import { Controller, IRoute, Methods } from "./controller";

const products = [
    {
        id: 1,
        title: "Notebook",
        image: "https://m.media-amazon.com/images/I/41e3YGKg-3L.jpg",
        price: 100,
        minQuantity: 3,
        offers: [
            {
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
        minQuantity: 10,
        offers: [
            {
                value: 3000,
                condition: ">",
                benefit: "flatDiscount",
                discount: 1000,
            },
        ],
    },
    {
        id: 3,
        title: "Bag",
        image: "https://m.media-amazon.com/images/I/81IiFRUxeWL._UL1500_.jpg",
        maxQuantity: 2,
        price: 1500,
        minQuantity: 1,
        offers: [],
    },
];

const applyOffer = (product: any, total: number) => {
    const { offers } = product;

    offers.forEach((offer: any, index: number) => {
        if (
            offer.benefit === "discount" &&
            eval(`${total} ${offer.condition} ${offer.value}`)
        ) {
            let offerText = "";
            const discount = (offer.percent / 100) * total;
            if (discount >= offer.max) {
                total = total - offer.max;
                offerText = `${offer.max} Rs Discount Applied`;
            } else {
                total = total - discount;
                offerText = `${discount} Rs Discount Applied`;
            }
            offers[index].applied = true;
            offers[index].appliedText = offerText;
        }

        if (
            offer.benefit === "flatDiscount" &&
            eval(`${total} ${offer.condition} ${offer.value}`)
        ) {
            total = total - offer.discount;
            offers[index].applied = true;
            offers[index].appliedText = `${offer.discount} Rs Discount Applied`;
        }
    });

    return [product, total];
};

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
        {
            path: "/add-to-cart",
            method: Methods.POST,
            handler: this.addToCart,
        },
        {
            path: "/cart/:userId",
            method: Methods.GET,
            handler: this.getCart,
        },
    ];

    public index(req: Request, res: Response) {
        res.json("Hey Folks, Well Come On board");
    }

    public getProducts(req: Request, res: Response, next: NextFunction) {
        return res.json({
            products: products.map(
                ({ offers, maxQuantity, minQuantity, ...rest }) => ({
                    ...rest,
                })
            ),
        });
    }

    public async addToCart(req: Request, res: Response, next: NextFunction) {
        const { userId, productId } = req.body;

        const redisKey = `cart-${userId}`;

        let cart: { id: number; quantity: number }[];

        try {
            cart = JSON.parse((await redisClient.get(redisKey)) as string);
        } catch (error) {
            return next(new ErrorHandler(500, "RedisErrorWhileGettingCart"));
        }

        const minQuantity =
            products.find((product) => product.id === productId)?.minQuantity ||
            0;

        if (cart) {
            const isProductExist = cart.findIndex(
                (item) => item.id === productId
            );
            if (isProductExist !== -1) {
                if (
                    products[isProductExist].maxQuantity !==
                    cart[isProductExist].quantity
                ) {
                    cart[isProductExist].quantity += 1;
                }
            } else {
                cart.push({
                    id: productId,
                    quantity: minQuantity,
                });
            }
        } else {
            cart = [
                {
                    id: productId,
                    quantity: minQuantity,
                },
            ];
        }

        try {
            await redisClient.set(redisKey, JSON.stringify(cart));
        } catch (error) {
            return next(new ErrorHandler(500, "RedisErrorWhileSettingCart"));
        }

        return res.sendStatus(200);
    }

    public async getCart(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        const redisKey = `cart-${userId}`;

        let cart: { id: number; quantity: number }[];

        try {
            cart = JSON.parse((await redisClient.get(redisKey)) as string);
        } catch (error) {
            return next(new ErrorHandler(500, "RedisErrorWhileGettingCart"));
        }

        let cartWithProductDetails: any = [],
            total = 0;

        if (cart) {
            cartWithProductDetails = cart
                .map(({ id, quantity }) => {
                    const product: any = products.find(
                        (product) => product.id === id
                    );

                    if (product) {
                        return {
                            product: {
                                id: product.id,
                                title: product.title,
                                image: product.image,
                                price: product.price,
                                offers: product.offers,
                            },
                            quantity,
                            total: quantity * product.price,
                        };
                    }

                    return null;
                })
                .filter((item) => item !== null);

            cartWithProductDetails = cartWithProductDetails.map(
                ({ product, total, ...rest }: any) => {
                    [product, total] = applyOffer(product, total);

                    return {
                        product,
                        total,
                        ...rest,
                    };
                }
            );

            total = cartWithProductDetails.reduce(
                (t: number, n: any) => t + (n?.total || 0),
                0
            );
        }

        const totalOffer = {
            applied: false,
            offerText: "",
        };

        if (total > 10000) {
            totalOffer.applied = true;
            totalOffer.offerText =
                "Promo Code 'PRIME123' applied and RS 123 discount ";
            total = total - 123;
        }

        return res.json({
            cart: cartWithProductDetails,
            total,
            totalOffer,
        });
    }
}
