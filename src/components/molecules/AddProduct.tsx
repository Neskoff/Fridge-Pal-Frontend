import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useAppDispatch } from "../../store";
import {
  addProduct,
  updateProductImage,
  updateProductState,
} from "../../store/productsStore";
import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DateTime } from "luxon";
import { Backdrop, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ProductRequest } from "../../types/ProductRequest";
import { DateTimeInput } from "../atoms/DateTimeInput";
import ValidationErrorAlert from "../atoms/ValidationErrorAlert";
import { yupResolver } from "@hookform/resolvers/yup";
import productRequestValidationSchema from "../../validation/productRequestValidationSchema";
import NumberInputIncremental from "../atoms/NumberInputIncremental";
interface AddProductProps {
  open: boolean;
  handleClose: () => void;
}

const AddProduct = ({ open, handleClose }: AddProductProps) => {
  const dispatch = useAppDispatch();

  const minDateTime = DateTime.now().plus({ minutes: 5 });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const defaultProductValues: ProductRequest = {
    name: "",
    type: "",
    quantity: 0,
    quantityUnit: "",
    storedDate: DateTime.now(),
    expiryDate: DateTime.now().plus({ days: 1 }),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductRequest>({
    defaultValues: defaultProductValues,
    resolver: yupResolver(productRequestValidationSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmitAddProduct = (productRequest: ProductRequest) => {
    setIsLoading(true);
    console.log(productRequest);
    dispatch(addProduct(productRequest))
      .unwrap()
      .then((res) => {
        const formData = new FormData();
        if (imageFile) {
          formData.append("file", imageFile);
          dispatch(updateProductImage({ productId: res.id, file: formData }))
            .unwrap()
            .then((imageRes) => {
              dispatch(updateProductState(imageRes));
              setIsLoading(false);
              handleClose();
            });
        } else {
          setIsLoading(false);
          dispatch(updateProductState(res));
          handleClose();
        }
        toast.success(`Product added successfully!`);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-GB">
      <Backdrop sx={() => ({ color: "#fff", zIndex: 999 })} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        sx={{ zIndex: 100 }}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit(onSubmitAddProduct),
            sx: { backgroundImage: "none" },
          },
        }}
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <DialogContentText>
            Fill in the product details to add it to your inventory.
          </DialogContentText>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                margin="dense"
                placeholder="Enter Product Name"
                label="Product Name"
                fullWidth
                {...field}
              />
            )}
          />
          <ValidationErrorAlert error={errors.name} />
          <Box>
            <Button variant="outlined" component="label">
              Upload Product Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {imageFile && (
              <Typography variant="body2" mt={1}>
                Selected file: {imageFile.name}
              </Typography>
            )}
          </Box>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel>Product Type</InputLabel>
                <Select label="Product Type" {...field}>
                  <MenuItem value="FRUITS">Fruit</MenuItem>
                  <MenuItem value="VEGETABLES">Vegetable</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <ValidationErrorAlert error={errors.type} />
          <Controller
            name="quantityUnit"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel>Quantity Unit</InputLabel>
                <Select label="Quantity Unit" {...field}>
                  <MenuItem value="KILOGRAM">Kilogram</MenuItem>
                  <MenuItem value="PIECE">Piece</MenuItem>
                  <MenuItem value="LITER">Liter</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <ValidationErrorAlert error={errors.quantityUnit} />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => <NumberInputIncremental field={field} />}
          />
          <ValidationErrorAlert error={errors.quantity} />
          <DateTimeInput
            name="storedDate"
            control={control}
            label="Stored Date"
            maxDate={DateTime.now()}
          />

          <DateTimeInput
            name="expiryDate"
            control={control}
            label="Expiry Date"
            minDate={minDateTime}
          />
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddProduct;
