import "./App.css";

import { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./assets/theme";

import { UserProvider } from "./context/UserContext";

import routes from "./routes";

import HomePage from "./layouts/pages/home";
import UserDetailsPage from "./layouts/pages/userDetails";
import UserModificationPage from "./layouts/pages/userModification";
import SignInPage from "./layouts/pages/authentication/sign-in";
import UserCreatePage from "./layouts/pages/userCreate";
import RolCreatePage from "./layouts/pages/rolCreate";
import RolDetailsPage from "./layouts/pages/rolDetails";
import RolModificationPage from "./layouts/pages/rolModification";
import LogOut from "./pages/LandingPages/LogOut";
import RecoverPassword from "./pages/LandingPages/RecoverPassword";
import ActivateUser from "./layouts/pages/activateUser";

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
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pages/authentication/sign-in"
            element={<SignInPage />}
          />
          <Route path="/pages/userDetails/:id" element={<UserDetailsPage />} />
          <Route
            path="/pages/userModification/:id"
            element={<UserModificationPage />}
          />
          <Route path="/pages/createUser" element={<UserCreatePage />} />
          <Route path="/pages/createRol" element={<RolCreatePage />} />
          <Route path="/pages/rolDetails/:id" element={<RolDetailsPage />} />
          <Route
            path="/pages/rolModification/:id"
            element={<RolModificationPage />}
          />
          <Route path="/pages/log-out" element={<LogOut />} />
          <Route path="/pages/recover-password" element={<RecoverPassword />} />
          <Route path="/pages/activate-user/:id" element={<ActivateUser />} />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
