import { Product } from "../types/Product";
import apiClient from "../config/axiosConfig";
import { ProductRequest } from "../types/ProductRequest";
import { UpdateProductImageRequest } from "../types/UpdateProductImageRequest";

export const getProductsApi = async (expired: boolean): Promise<Product[]> => {
  return apiClient
    .get("/products", { params: { expired } })
    .then((res) => res.data);
};

export const addProductApi = async (
  product: ProductRequest,
): Promise<Product> => {
  return apiClient.post("products", product).then((res) => res.data);
};

export const deleteProductApi = async (productId: number): Promise<void> => {
  return apiClient.delete(`/products/${productId}`).then((res) => res.data);
};

export const updateProductImageApi = async (
  request: UpdateProductImageRequest,
): Promise<Product> => {
  return apiClient
    .put(`/products/${request.productId}/image`, request.file)
    .then((res) => res.data);
};
