import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, Grid, Alert, Snackbar } from "@mui/material";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Input from "../../../components/Input";
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
  let userId = ObtenerId();

  //Alert
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [openAlert, setOpenAlert] = useState(true);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
                      type="password"
                      label="Contraseña"
                      fullWidth
                      onChange={handlePasswordChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="password"
                      label="Confirmar contraseña"
                      fullWidth
                      onChange={handlePasswordConfirmationChange}
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
