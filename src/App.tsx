import "./App.css";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./components/pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./theme/AppTheme";
import Home from "./components/pages/Home";
import PrivateRoute from "./guards/PrivateRoute";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </AppTheme>
    </Provider>
  );
}

export default App;
