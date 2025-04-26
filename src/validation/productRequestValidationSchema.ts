import * as yup from "yup";
import { DateTime } from "luxon";

const productRequestValidationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  type: yup.string().required("Product type is required"),
  quantity: yup
    .number()
    .required("Product quantity is required")
    .min(1, "Quantity must be greater than 0"),
  quantityUnit: yup.string().required("Product quantity unit is required"),
  storedDate: yup.mixed<DateTime>().required("Product stored date is required"),
  expiryDate: yup.mixed<DateTime>().required("Product expiry date is required"),
});

export default productRequestValidationSchema;
