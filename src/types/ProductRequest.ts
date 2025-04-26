import {DateTime} from "luxon";

export interface ProductRequest {
  name: string;
  type: string;
  quantity: number;
  quantityUnit: string;
  storedDate: DateTime;
  expiryDate: DateTime;
}
