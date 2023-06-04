import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import { CheckBox } from "@mui/icons-material";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserSettings() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  const id = ObtenerId();
  const url = "Agregar URL para obtener el usuario con ese Id" + id;
  const [userInfo, setUserInfo] = useState([]);

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
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response.json().then((data) => {
          setUserInfo(data);
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Roles:", roles);
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
                      fullWidth
                      value={userInfo.username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      value={userInfo.email}
                      onChange={(event) => setEmail(event.target.value)}
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

export default UserSettings;
