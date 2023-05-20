import "./App.css";

import { useEffect } from "react";

import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./assets/theme";
import Principal from "./layouts/pages/principal";

import routes from "./routes";

import UserSettings from "./pages/UserSettings/userSettings";

function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/principal" element={<Principal />} />
        <Route path="*" element={<Navigate to="/principal" />} />
        <Route path="/userSetting" element={<UserSettings/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
