import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/Product";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductImageApi,
} from "../services/productService";
import { AxiosError } from "axios";
import { ProductRequest } from "../types/ProductRequest";
import { UpdateProductImageRequest } from "../types/UpdateProductImageRequest";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (expired: boolean, { rejectWithValue }) => {
    try {
      return getProductsApi(expired);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data?.message.toString() || error.message,
        );
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: ProductRequest, { rejectWithValue }) => {
    try {
      return addProductApi(product);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data?.message.toString() || error.message,
        );
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

export const updateProductImage = createAsyncThunk(
  "products/updateProductImage",
  async (request: UpdateProductImageRequest, { rejectWithValue }) => {
    try {
      return updateProductImageApi(request);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data?.message.toString() || error.message,
        );
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      await deleteProductApi(productId);
      return productId;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data?.message.toString() || error.message,
        );
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [] as Product[],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(updateProductImage.fulfilled, (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      state.products[productIndex] = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    });
  },
});

export default productSlice.reducer;
