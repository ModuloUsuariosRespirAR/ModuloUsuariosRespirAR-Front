import Box from "../../components/Box";

import DefaultNavbar from "../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../components/Footer/CenteredFooter";

import routes from "../../routes";
import footerRoutes from "../../footer.routes";

import bgImage from "../../assets/images/fiware.jpg";

function Principal() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          name: "sign in",
          route: "/pages/authentication/sign-in",
          label: "Iniciar sesión",
        }}
        sticky
      />
      <Box
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPositionY: "45%",
          display: "grid",
          placeItems: "center",
        }}
      ></Box>
      <Box pt={6} px={1} mt={0}>
        <CenteredFooter content={footerRoutes} />
      </Box>
    </>
  );
}

export default Principal;
