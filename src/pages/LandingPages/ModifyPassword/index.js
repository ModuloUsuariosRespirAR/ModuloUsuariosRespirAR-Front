import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { recoverPassword } from "../../../services/MailerService";

import { Card, Grid, Alert, Snackbar, TextField } from "@mui/material";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function ModifyPassword() {
  const navigate = useNavigate();
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let userId = ObtenerId();

  //Alert
  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [openAlert, setOpenAlert] = useState(true);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    navigate("/pages/authentication/sign-in");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const validatePassword = () => {
    if (password.length > 0 && passwordConfirmation.length > 0) {
      if (password !== passwordConfirmation) {
        setError(true);
        setErrorMessage("Las contraseñas no coinciden");
      } else {
        setError(false);
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!error) {
      try {
        const result = await recoverPassword(userId, passwordConfirmation);
        if (JSON.stringify(result).includes("values_updated")) {
          setAlert(true);
          setAlertContent("Contraseña modificada correctamente");
          setAlertSeverity("success");
        } else {
          setAlert(true);
          setAlertContent("La contraseña no pudo ser modificada");
          setAlertSeverity("error");
        }
      } catch (error) {}
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
            <Alert severity={alertSeverity} sx={{ width: "100%" }}>
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
                  Modificar contraseña
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <TextField
                      type="password"
                      label="Contraseña"
                      fullWidth
                      onChange={handlePasswordChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      type="password"
                      label="Confirmar contraseña"
                      fullWidth
                      onChange={handlePasswordConfirmationChange}
                      onKeyUp={validatePassword}
                      error={error}
                      helperText={errorMessage}
                    />
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      onClick={handleSubmit}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Aceptar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
}

export default ModifyPassword;
