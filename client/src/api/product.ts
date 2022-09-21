import { AxiosResponse } from "axios";
import api from ".";
import { IProduct } from "../types";

export const getAllProducts = (): Promise<
    AxiosResponse<{
        products: IProduct[];
    }>
> => api.get("/products");
