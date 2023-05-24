import Box from "../../components/Box";

import DefaultNavbar from "../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../components/Footer/CenteredFooter";

import routes from "../../routes";
import footerRoutes from "../../footer.routes";

import bgImage from "../../assets/images/smartcity.jpg";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function Principal() {
  return (
    // <>
    //   <DefaultNavbar
    //     routes={routes}
    //     action={{
    //       name: "sign in",
    //       route: "/pages/authentication/sign-in",
    //       label: "Iniciar sesión",
    //     }}
    //     sticky
    //   />
    //   <Box
    //     minHeight="85vh"
    //     width="100%"
    //     sx={{
    //       backgroundImage: `url(${bgImage})`,
    //       backgroundSize: "cover",
    //       backgroundPositionY: "50%",
    //       display: "grid",
    //       placeItems: "center",
    //     }}
    //   />
    //   <Box width="100%" position="absolute" zIndex={2} bottom="1.625rem">
    //     <CenteredFooter content={footerRoutes} />
    //   </Box>
    // </>
    <BaseLayout></BaseLayout>
  );
}

export default Principal;
