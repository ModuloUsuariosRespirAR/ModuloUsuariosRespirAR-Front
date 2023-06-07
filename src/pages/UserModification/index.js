import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/UserContext";

import { Card, Grid, FormControlLabel, Switch } from "@mui/material";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import { CheckBox } from "@mui/icons-material";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserModification() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  const userId = ObtenerId();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    roles: "",
  });

  const { userModification, userDetails } = useAuth();
  const [habilitado, setHabilitado] = useState(false);
  const [roles, setRoles] = useState("");

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    let token = localStorage.getItem("Token");
    if (token !== null) {
      const result = await userDetails(token, userId);
      setUserInfo(result.user);
    }
  };

  const handleChange = (event) => {
    setUserInfo((ui) => ({ ...ui, username: event.target.value }));
  };

  const handleSubmit = async (event) => {
    let token = localStorage.getItem("Token");
    event.preventDefault();

    console.log("Entra al guardar");

    try {
      if (token !== null) {
        const result = await userModification(token, userId, userInfo.username);
        if (result !== null) {
          navigate("/pages/usuarios");
        } else {
          console.log("Hubo un error al crear el usuario");
        }
      } else {
        console.log("El usuario debe iniciar sesión");
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
                  Editar usuario
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Username"
                      name="username"
                      fullWidth
                      value={userInfo.username}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      value={userInfo.email}
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <MultipleSelectChip
                      options={rolesEjemplos}
                      label="Roles"
                      placeholder="Seleccione uno o más roles"
                      onChange={(event, value) => setRoles(value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      label="Habilitado"
                      control={
                        <Switch
                          color="warning"
                          checked={habilitado}
                          onChange={(event, value) =>
                            setHabilitado(event.target.checked)
                          }
                        />
                      }
                    />
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" ml={0}>
                  <CheckBox />
                  <Typography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Cuenta Verificada
                  </Typography>
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

export default UserModification;
