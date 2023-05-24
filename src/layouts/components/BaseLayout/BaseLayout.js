import PropTypes from "prop-types";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";

import DefaultNavbar from "../../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../../components/Footer/CenteredFooter";

import bgImage from "../../../assets/images/smartcity.jpg";

import routes from "../../../routes";
import footerRoutes from "../../../footer.routes";

function BaseLayout({ breadcrumb, title, children }) {
  return (
    <>
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

        <Box fixed sx={{ mt: 15 }}>
          {children}
        </Box>
      </Box>
      <Box width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <CenteredFooter content={footerRoutes} />
      </Box>
    </>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  //   breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
  //     .isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
