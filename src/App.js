import "./App.css";

import { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./assets/theme";
import Principal from "./layouts/pages/principal";

import routes from "./routes";

import UserSettings from "./layouts/pages/userSettings";
import SignInPage from "./layouts/pages/authentication/sign-in";
import UserCreatePage from "./layouts/pages/userCreate";
import RolCreatePage from "./layouts/pages/rolCreate";
import RolSettingsPage from "./layouts/pages/rolSettings";

function App() {
  const { pathname } = useLocation();

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
        <Route path="/" element={<Principal />} />
        <Route path="/pages/authentication/sign-in" element={<SignInPage />} />
        <Route path="/pages/userSettings/:id" element={<UserSettings />} />
        <Route path="/pages/createUser" element={<UserCreatePage />} />
        <Route path="/pages/createRol" element={<RolCreatePage />} />
        <Route path="/pages/rolSettings/:id" element={<RolSettingsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
