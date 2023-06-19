import { useState } from "react";

import { createRol } from "../../services/RolService";

import { useNavigate } from "react-router-dom";

import { Card, Grid, TextField, Alert, Snackbar } from "@mui/material";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function RolCreate() {
  const [rol, setRol] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("Token");
  let accessToken = localStorage.getItem("Access");

  //Alerta
  const [openAlert, setOpenAlert] = useState(true);
  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rol === "") {
      setAlert(true);
      setAlertContent("Debe completar todos los campos");
      handleClick();
    } else {
      if (token !== null && accessToken !== null) {
        await createRol(token, accessToken, rol);
        navigate("/pages/roles");
      }
    }
  };

  return (
    <>
      <BaseLayout>
        {alert ? (
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity="error"
              onClose={handleCloseAlert}
              sx={{ width: "100%" }}
            >
              {alertContent}
            </Alert>
          </Snackbar>
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
                    <TextField
                      type="text"
                      label="Rol"
                      fullWidth
                      value={rol}
                      onChange={(event) => setRol(event.target.value)}
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

export default RolCreate;
