import { ProductImage } from "./ProductImage";

export interface Product {
  id: number;
  name: string;
  type: string;
  quantity: number;
  quantityUnit: string;
  storedDate: Date;
  expiryDate: Date;
  productImage?: ProductImage;
  expired?: boolean;
}
