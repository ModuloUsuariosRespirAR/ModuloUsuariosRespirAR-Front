import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useAuth } from "../../context/UserContext";
import { getRoles, assignRol } from "../../services/RolService";

import { Card, Grid, TextField, Alert, Snackbar } from "@mui/material";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserCreate() {
  const navigate = useNavigate();
  const { createNewUser, isAuthenticated } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [rolesBase, setRolesBase] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [open, setOpen] = useState(true);
  const [emailError, setEmailError] = useState("");
  let token = localStorage.getItem("Token");

  //Alerta
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //Email
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
    }
    fetchData();
  }, []);

  const handleChangeRol = (event, value) => {
    setRoles(value);
  };

  //Guardo usuario junto con sus roles
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      username === "" ||
      displayName === "" ||
      email === "" ||
      password === ""
    ) {
      setAlert(true);
      setAlertContent("Debe completar todos los campos");
      handleClick();
    } else if (validateEmail(email)) {
      try {
        if (isAuthenticated && token !== null) {
          const user = await createNewUser(
            token,
            displayName,
            username,
            email,
            password
          );
          console.log("Roles", roles);
          if (
            roles !== null &&
            roles !== undefined &&
            roles !== "" &&
            user !== null
          ) {
            roles.map(async (rol) => {
              await assignRol(token, user.user.id, rol.id);
            });
            navigate("/pages/users");
          } else {
            navigate("/pages/users");
          }
        } else {
          navigate("/pages/authentication/sign-in");
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <BaseLayout>
        {alert ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              severity="error"
              onClose={handleClose}
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
                    {/* <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {emailError}
                    </span> */}
                  </Box>
                  <Box mb={2}>
                    <TextField
                      type="password"
                      label="Contraseña"
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </Box>
                  <Box>
                    <Box mb={2}>
                      <MultipleSelectChip
                        options={rolesBase}
                        label="Roles"
                        placeholder="Seleccione uno o más roles"
                        onChange={handleChangeRol}
                      />
                    </Box>
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

export default UserCreate;
