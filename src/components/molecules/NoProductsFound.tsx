import Typography from "@mui/material/Typography";
import React from "react";
import { Box } from "@mui/material";

const NoProductsFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        gap: "2rem",
        marginTop: "2rem",
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        No Products Found
      </Typography>
      <Typography
        component="h1"
        variant="h3"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Please add a product to display
      </Typography>
    </Box>
  );
};

export default NoProductsFound;
