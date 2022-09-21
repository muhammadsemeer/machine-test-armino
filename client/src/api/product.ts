import { AxiosResponse } from "axios";
import api from ".";
import { IProduct } from "../types";

export const getAllProducts = (): Promise<
    AxiosResponse<{
        products: IProduct[];
    }>
> => api.get("/products");

export const addToCart = (
    userId: string,
    productId: number
): Promise<AxiosResponse> =>
    api.post("/add-to-cart", {
        userId,
        productId,
    });
