import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

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

export default HomeContainer;
