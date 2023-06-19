import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { recoverPasswordMail } from "../../../services/MailerService";

import { Card, Grid, Alert, Snackbar } from "@mui/material";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //Alert

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Borrar campo una vez que se pidó la recuperación de la contraseña
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      itemvalues: [{}],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await recoverPasswordMail(email);
      setAlert(true);
      setAlertContent(result);
      handleClick();
      handleReset();
    } catch (error) {}
  };

  return (
    <>
      <BaseLayout>
        {alert ? (
          <Snackbar
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity="info"
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
                  Recuperar contraseña
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      onChange={handleEmailChange}
                    />
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      onClick={handleSubmit}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Recuperar
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

export default RecoverPassword;
