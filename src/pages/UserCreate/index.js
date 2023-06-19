import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useAuth } from "../../context/UserContext";
import { getRoles, assignRol } from "../../services/RolService";
import { activateUserMail } from "../../services/MailerService";

import { Card, Grid, TextField, Alert, Snackbar } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import SimpleDialog from "../../components/Dialog";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserCreate() {
  const navigate = useNavigate();
  const { createNewUser, isAuthenticated } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rolesBase, setRolesBase] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loading, setLoading] = useState(true);
  let token = localStorage.getItem("Token");
  let accesstoken = localStorage.getItem("Access");

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

  //Dialog
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) setSelectedValue(value);
  };

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

  //Roles disponibles
  useEffect(() => {
    async function fetchData() {
      const result = await getRoles(token);
      setRolesBase(result.roles);
      setLoading(false);
    }
    fetchData();
  }, []);

  //Guardo usuario junto con sus roles
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || displayName === "" || email === "") {
      setAlert(true);
      setAlertContent("Debe completar todos los campos");
      handleClick();
    } else if (validateEmail(email)) {
      try {
        if (isAuthenticated && token !== null && accesstoken !== null) {
          const user = await createNewUser(
            token,
            accesstoken,
            displayName,
            username,
            email,
            "1234"
          );
          if (user !== null && !user.error) {
            let userId = user.user.id;
            activateUserMail(userId);
            if (
              selectedValue !== null &&
              selectedValue !== undefined &&
              selectedValue !== ""
            ) {
              selectedValue.map(async (rol) => {
                await assignRol(token, accesstoken, userId, rol);
              });
              navigate("/pages/users");
            } else {
              navigate("/pages/users");
            }
          } else {
            setAlert(true);
            setAlertContent("El correo electrónico ya fue utilizado");
            handleClick();
          }
        } else {
          navigate("/pages/authentication/sign-in");
        }
      } catch (error) {}
    }
  };

  if (loading) {
    return <Alert severity="info">Data is loading...</Alert>;
  } else {
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
                    Crear usuario
                  </Typography>
                </Box>
                <Box pt={4} pb={3} px={3}>
                  <form onSubmit={handleSubmit} className="p-3">
                    <Box mb={2}>
                      <TextField
                        variant="outlined"
                        type="text"
                        label="Display Name"
                        fullWidth
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        required
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        variant="outlined"
                        type="text"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        type="email"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        placeholder="mail@mail.com"
                        helperText={emailError}
                      />
                    </Box>
                    <Box mb={2}>
                      <Button
                        variant="outlined"
                        color="info"
                        startIcon={<SecurityIcon />}
                        onClick={handleClickOpen}
                      >
                        Asignar roles
                      </Button>
                      <SimpleDialog
                        open={open}
                        onClose={handleClose}
                        items={rolesBase}
                        selectedValue={selectedValue}
                        title="Seleccione uno o más roles"
                      />
                    </Box>
                    <Box mt={4} mb={1}>
                      <Button
                        type="submit"
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={handleSubmit}
                      >
                        Guardar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </BaseLayout>
      </>
    );
  }
}

export default UserCreate;
