import PropTypes from "prop-types";

import { useAuth } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

import Box from "../../../components/Box";
import DefaultNavbar from "../../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../../components/Footer/CenteredFooter";

import bgImage from "../../../assets/images/smartcity.jpg";

import routes from "../../../routes";
import footerRoutes from "../../../footer.routes";
import { useEffect } from "react";

function BaseLayout({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        bgColor="white"
        minHeight="100vh"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Box
          position="center"
          top={1}
          left={1}
          zIndex={1}
          width="100%"
          minHeight="100vh"
          sx={{
            backgroundImage: ({
              functions: { linearGradient, rgba },
              palette: { gradients },
            }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0),
                rgba(gradients.dark.state, 0)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isAuthenticated ? (
            <Box bgColor="white" shadow="sm" py={0}>
              <DefaultNavbar
                routes={routes}
                action={{
                  name: "log out",
                  route: "/pages/log-out",
                  label: "Cerrar sesión",
                  type: "internal",
                }}
                sticky
              />
            </Box>
          ) : (
            <Box bgColor="white" shadow="sm" py={0}>
              <DefaultNavbar
                routes={routes}
                action={{
                  name: "sign in",
                  route: "/pages/authentication/sign-in",
                  label: "Iniciar sesión",
                }}
                sticky
              />
            </Box>
          )}

          <Box sx={{ mt: 10 }} justifyContent="center">
            {children}
          </Box>
        </Box>
      </Box>
      <Box mt="auto">
        <CenteredFooter content={footerRoutes} />
      </Box>
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
