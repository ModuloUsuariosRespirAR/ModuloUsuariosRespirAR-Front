import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/UserContext";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserCreate() {
  const rolesEjemplos = [
    {
      name: "Administrator",
      id: 1,
    },
    {
      name: "No admin",
      id: 2,
    },
    {
      name: "Sin permisos",
      id: 3,
    },
  ];

  const navigate = useNavigate();
  const { createNewUser, isAuthenticated } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");

  const handleChangeRol = (event, value) => {
    setRoles(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let token = localStorage.getItem("Token");
    try {
      if (token !== null) {
        const result = await createNewUser(
          token,
          displayName,
          username,
          email,
          password
        );
        if (result !== null) {
          navigate("/pages/usuarios");
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <BaseLayout>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
          marginTop="150px"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <Box
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <Typography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Crear usuario
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Display Name"
                      fullWidth
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Username"
                      fullWidth
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="password"
                      label="Contraseña"
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box mb={2}>
                    <MultipleSelectChip
                      options={rolesEjemplos}
                      label="Roles"
                      placeholder="Seleccione uno o más roles"
                      onChange={handleChangeRol}
                    />
                  </Box>
                </Box>
                <Box mt={4} mb={1}>
                  <Button
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Guardar
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
}

export default UserCreate;