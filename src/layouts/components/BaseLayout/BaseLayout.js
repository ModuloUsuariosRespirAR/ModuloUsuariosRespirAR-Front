import PropTypes from "prop-types";

import { useAuth } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

import Box from "../../../components/Box";
import DefaultNavbar from "../../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../../components/Footer/CenteredFooter";

import bgImage from "../../../assets/images/smartcity.jpg";

import routes from "../../../routes";
import footerRoutes from "../../../footer.routes";

function BaseLayout({ children }) {
  const { user, isAuthenticated, logOut } = useAuth();
  const navigate = useNavigate();

  const logOutOnClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgColor="white"
      minHeight="100vh"
    >
      <Box
        position="fixed"
        top={1}
        left={1}
        zIndex={1}
        width="100%"
        minHeight="85vh"
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
                route: "",
                label: "Cerrar sesión",
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
      <Box mt="auto">
        <CenteredFooter content={footerRoutes} />
      </Box>
    </Box>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
