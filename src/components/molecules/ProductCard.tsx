import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Product } from "../../types/Product";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAppDispatch } from "../../store";
import { deleteProduct } from "../../store/productsStore";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import splitIsoDateTime from "../../utils/dateUtils";
import StyledCard2 from "../atoms/StyledCard2";

interface ProductCardProps {
  product: Product;
}

const settings = [
  // eslint-disable-next-line react/jsx-key
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <DeleteIcon /> &nbsp;Delete
  </Box>,
];

const ProductCard = ({ product }: ProductCardProps) => {
  const { dateString, timeString } = splitIsoDateTime(product.storedDate);
  const { dateString: endDateString, timeString: endTimeString } =
    splitIsoDateTime(product.expiryDate);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = localStorage.getItem("currentUser");

  const handleProductDelete = () => {
    setIsLoading(true);
    dispatch(deleteProduct(product.id))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        handleClose();
        toast.success("Product deleted successfully!");
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e);
      });
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <StyledCard2 sx={{ width: 320 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {currentUser?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ marginBottom: "0.3rem" }}>
            {product.name}{" "}
            <Chip
              label={product.expired ? "Expired" : "Fresh"}
              variant={"outlined"}
              color={product.expired ? "error" : "success"}
            />
          </Box>
        }
        subheader={`Stored: ${dateString} \n ${timeString}`}
      />
      <CardMedia
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          borderRadius: "1rem",
        }}
        component="img"
        height="194"
        image={
          product.productImage?.imageUrl ||
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_521/k%2FPhoto%2FSeries%2F2019-10--power-hour-instant-pot%2FPower-Hour-Instant-Pot_001-rotated"
        }
        alt="Paella dish"
      />
      <CardContent>
        <p>
          Type: <span style={{ color: "#94a0b8" }}>{product.type}</span>
        </p>
        <p>
          Quantity: <span style={{ color: "#94a0b8" }}>{product.quantity}</span>
        </p>
        <p>
          Quantity Unit:{" "}
          <span style={{ color: "#94a0b8" }}>{product.quantityUnit}</span>
        </p>
        <p>
          Expiry Date:{" "}
          <span
            style={{ color: "#94a0b8" }}
          >{`${endDateString} ${endTimeString}`}</span>
        </p>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", gap: "0.5rem" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem
            component="div"
            key={`product_${product.id}_${index}`}
            onClick={() => setOpen(true)}
          >
            {setting}
          </MenuItem>
        ))}
      </Menu>
      <ConfirmDelete
        open={open}
        handleClose={handleClose}
        handleDelete={handleProductDelete}
        loading={isLoading}
      />
    </StyledCard2>
  );
};

export default ProductCard;
