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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useAppDispatch } from "../../store";
import { addProduct, updateProductImage } from "../../store/productsStore";
import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DateTime } from "luxon";
import { PickerValue } from "@mui/x-date-pickers/internals";
interface AddProductProps {
  open: boolean;
  handleClose: () => void;
}

const AddProduct = ({ open, handleClose }: AddProductProps) => {
  const dispatch = useAppDispatch();
  const minDateTime = DateTime.now().plus({ minutes: 5 });
  const [productName, setProductName] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [quantityType, setQuantityType] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [storedDate, setStoredAt] = React.useState<PickerValue | null>(null);
  const [expiryDate, setExpiryDate] = React.useState<PickerValue | null>(null);

  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addProduct({
        name: productName,
        type: productType,
        quantityUnit: quantityType,
        quantity,
        storedDate: storedDate ? storedDate.toJSDate() : new Date(),
        expiryDate: expiryDate ? expiryDate.toJSDate() : new Date(),
      }),
    )
      .unwrap()
      .then((res) => {
        const formData = new FormData();
        if (imageFile) {
          formData.append("file", imageFile);
          dispatch(updateProductImage({ productId: res.id, file: formData }))
            .unwrap()
            .then(() => handleClose());
        }
        handleClose();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-GB">
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
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

          <OutlinedInput
            required
            margin="dense"
            id="product-name"
            placeholder="Enter Product Name"
            name="productName"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
          />
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Product Type</InputLabel>
            <Select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              label="Product Type"
              required
            >
              <MenuItem value="FRUITS">Fruit</MenuItem>
              <MenuItem value="VEGETABLES">Vegetable</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Quantity Type</InputLabel>
            <Select
              value={quantityType}
              onChange={(e) => setQuantityType(e.target.value)}
              label="Quantity Type"
              required
            >
              <MenuItem value="KILOGRAM">Kilogram</MenuItem>
              <MenuItem value="PIECE">Piece</MenuItem>
              <MenuItem value="LITER">Liter</MenuItem>
            </Select>
          </FormControl>

          <OutlinedInput
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            type="number"
            fullWidth
          />

          <DateTimePicker
            maxDateTime={DateTime.now()}
            label="Stored At"
            value={storedDate}
            onChange={(date) => setStoredAt(date)}
          />

          <DateTimePicker
            label="Expiry Date"
            minDateTime={minDateTime}
            value={expiryDate}
            onChange={(date) => setExpiryDate(date)}
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
