import React, { useState } from "react";

import { useEffect } from "react";
import Navbar from "../molecules/Navbar";
import ProductCard from "../molecules/ProductCard";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProducts } from "../../store/productsStore";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "../molecules/AddProduct";
import NoProductsFound from "../molecules/NoProductsFound";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import toast from "react-hot-toast";
import HomeContainer from "../atoms/HomeContainer";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const productStore = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [expired, setExpired] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getProducts(expired))
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  }, [expired]);

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
      {(loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "5rem",
            marginTop: "5rem",
          }}
        >
          <CircularProgress size="5rem" color="inherit" />
        </Box>
      )) ||
        (productStore.products.length > 0 && (
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
