import React, { useState } from "react";

import { useEffect } from "react";
import Navbar from "../molecules/Navbar";
import ProductCard from "../molecules/ProductCard";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProducts } from "../../store/productsStore";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import AddProduct from "../molecules/AddProduct";
import NoProductsFound from "../molecules/NoProductsFound";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Home = () => {
  const productStore = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [expired, setExpired] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts(expired));
  }, [expired]);

  const HomeContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    padding: theme.spacing(2),
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "fixed",
      zIndex: -1,
      inset: 0,
      backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      backgroundRepeat: "no-repeat",
      ...theme.applyStyles("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
      }),
    },
  }));

  return (
    <HomeContainer>
      <Navbar />
      <Box sx={{ gap: "1rem" }} display="flex">
        <Button
          sx={{ marginTop: "1rem", padding: "1.5rem 2rem" }}
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          <AddIcon /> Add a product
        </Button>
        <Button
          sx={{ marginTop: "1rem", padding: "1.5rem 2rem" }}
          variant={expired ? "contained" : "outlined"}
          color={expired ? "error" : "primary"}
          onClick={() => setExpired(!expired)}
        >
          <FilterAltIcon /> Filter Expired
        </Button>
      </Box>
      {(productStore.products.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {productStore.products.map((product) => (
            <ProductCard key={`product_${product.id}`} product={product} />
          ))}
        </Box>
      )) || <NoProductsFound />}
      <AddProduct open={open} handleClose={handleClose} />
    </HomeContainer>
  );
};

export default Home;
