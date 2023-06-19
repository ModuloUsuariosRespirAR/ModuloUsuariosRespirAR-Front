import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { detailRol, editRol } from "../../services/RolService";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function RolModification() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  const rolId = ObtenerId();
  let token = localStorage.getItem("Token");
  let accessToken = localStorage.getItem("Access");
  const navigate = useNavigate();

  const [rol, setRol] = useState({
    name: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const result = await detailRol(rolId, token);
      setRol(result.role);
    }
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    setRol((rol) => ({
      ...rol,
      name: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await editRol(token, accessToken, rolId, rol.name);
      if (JSON.stringify(result).includes("Error")) {
        setAlert(true);
        setAlertContent("Error al modificar el rol");
        throw new Error("Error al modificar el rol");
      }
      navigate("/pages/roles");
    } catch (error) {}
  };

  return (
    <>
      <>
        <BaseLayout>
          {alert ? (
            <Alert
              severity="error"
              onClose={() => {
                navigate("/pages/roles");
              }}
            >
              {alertContent}
            </Alert>
          ) : (
            <></>
          )}
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
                    Crear rol
                  </Typography>
                </Box>
                <Box pt={4} pb={3} px={3}>
                  <Box component="form" role="form">
                    <Box mb={2}>
                      <Input
                        type="text"
                        label="Rol"
                        name="name"
                        fullWidth
                        value={rol.name}
                        onChange={handleChange}
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
    </>
  );
}

export default RolModification;
