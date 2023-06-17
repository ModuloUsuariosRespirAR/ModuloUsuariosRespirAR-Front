import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/UserContext";

import validator from "validator";

import { Card, Grid, Alert, Snackbar } from "@mui/material";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function SignInBasic() {
  const navigate = useNavigate();

  const { loginUsuario } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Alert
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [openAlert, setOpenAlert] = useState(true);

  //Email
  const [emailError, setEmailError] = useState("");

  const validateEmail = (e) => {
    var email = e;
    if (validator.isEmail(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Ingresá un email válido");
      return false;
    }
  };

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const recuperarContrasenia = () => {
    navigate("/pages/recover-password");
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateEmail(username)) {
        const result = await loginUsuario(username, password);
        if (result === null || result === undefined) {
          setAlert(true);
          setAlertContent("Error al loguear usuario");
          handleClick();
        } else {
          navigate("/");
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <BaseLayout>
        {alert ? (
          <Snackbar
            open={openAlert}
            autoHideDuration={10000}
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
                  Sign in
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      placeholder="mail@mail.com"
                      helperText={emailError}
                      onChange={handleUsernameChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="password"
                      label="Password"
                      fullWidth
                      onChange={handlePasswordChange}
                    />
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      onClick={handleSubmit}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      sign in
                    </Button>
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      onClick={recuperarContrasenia}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Recuperar contraseña
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

export default SignInBasic;
