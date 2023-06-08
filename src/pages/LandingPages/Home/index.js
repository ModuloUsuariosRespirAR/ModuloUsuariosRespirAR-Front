import { Link as RouterLink } from "react-router-dom";

import { Grid, Box, Link, Container } from "@mui/material";

import Card from "../../../components/Card/Card";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

import users from "../../../assets/images/users.jpeg";
import roles from "../../../assets/images/roles.jpeg";

const cards = [
  {
    items: [
      {
        image: users,
        name: "Lista de usuarios",
        route: "/pages/users",
      },
      {
        image: roles,
        name: "Lista de roles",
        route: "/pages/roles",
      },
    ],
  },
];

function DesignBlocks() {
  const renderData = cards.map(({ items }) => (
    <Grid container spacing={5} sx={{ mb: 10 }}>
      <Grid item xs={12} lg={3}>
        <Box position="center" top="100px" pb={{ xs: 2, lg: 6 }}></Box>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container style={{ gap: 200 }} spacing={5} minHeight="70px">
          {items.map(({ image, name, route }) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
              <Link component={RouterLink} to={route}>
                <Card image={image} name={name} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <Box component="section" my={6} py={6}>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </Box>
  );
}

function Home() {
  return (
    <>
      <BaseLayout
        children={
          <Grid
            container
            item
            xs={11}
            spacing={3}
            alignItems="center"
            sx={{ mx: "auto" }}
          >
            <DesignBlocks />
          </Grid>
        }
      ></BaseLayout>
    </>
  );
}

export default Home;
