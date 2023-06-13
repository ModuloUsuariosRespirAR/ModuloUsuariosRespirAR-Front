import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/UserContext";
import { getRoles, assignRol } from "../../services/RolService";

import {
  Card,
  Grid,
  FormControlLabel,
  Switch,
  Alert,
  Divider,
  Snackbar,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";
import SimpleDialog from "../../components/Dialog";

import { CheckBox } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";
import { TextField } from "@mui/material";

function UserModification() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  const userId = ObtenerId();
  let token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    roles: "",
  });

  const { userModification, userDetails, userRoles } = useAuth();
  const [username, setUsername] = useState("");
  const [habilitado, setHabilitado] = useState(false);
  const [roles, setRoles] = useState("");
  const [rolesBase, setRolesBase] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loading, setLoading] = useState(true);
  let rolesEncontrados = [];

  //Dialog
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleClickOpen = () => {
    setSelectedValue(rolesEncontrados);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) setSelectedValue(value);
  };

  //Carga de datos del usuario junto con sus roles
  useEffect(() => {
    async function fetchData() {
      const result = await getRoles(token);
      setRolesBase(result.roles);
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchUserRoles() {
      let rolesUser = await userRoles(userId, token);
      setRoles(rolesUser["role_user_assignments"]);
      setLoading(false);
    }
    fetchUserRoles();
  }, []);

  if (roles !== "" && roles !== undefined && roles !== null) {
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < rolesBase.length; j++) {
        if (roles[i].role_id === rolesBase[j].id) {
          rolesEncontrados.push(rolesBase[j].id);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      if (token !== null) {
        const result = await userDetails(token, userId);
        setUserInfo(result.user);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    setUserInfo((ui) => ({
      ...ui,
      username: event.target.value,
    }));
    setUsername(userInfo.username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      selectedValue !== null &&
      selectedValue !== undefined &&
      selectedValue !== ""
    ) {
      selectedValue.map(async (rol) => {
        await assignRol(token, userId, rol);
      });
      navigate("/pages/users");
    }
    try {
      if (token !== null) {
        const result = await userModification(token, userId, userInfo.username);
        if (!result.ok) {
          setAlert(true);
          setAlertContent("Error al modificar el usuario");
          throw new Error("Error al modificar el usuario");
        } else {
        }
      } else {
        setAlert(true);
        setAlertContent("El usuario debe iniciar sesion");
      }
    } catch (error) {}
    navigate("/pages/users");
  };

  if (loading) {
    return <Alert severity="info">Data is loading...</Alert>;
  } else {
    return (
      <>
        <BaseLayout>
          {alert ? (
            <Snackbar
              autoHideDuration={6000}
              onClose={navigate("/pages/users")}
            >
              <Alert
                severity="error"
                onClose={() => {
                  navigate("/pages/users");
                }}
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
                    Editar usuario
                  </Typography>
                </Box>
                <Box pt={4} pb={3} px={3}>
                  <Box component="form" role="form">
                    <Box mb={2}>
                      <TextField
                        type="text"
                        label="Username"
                        name="username"
                        id="username"
                        fullWidth
                        value={userInfo.username}
                        onChange={handleChange}
                        error={userInfo.username === ""}
                        helperText={
                          userInfo.username === "" &&
                          "El campo username es requerido"
                        }
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        type="email"
                        label="Email"
                        fullWidth
                        value={userInfo.email}
                        disabled
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
                      check={rolesEncontrados}
                      title="Seleccione uno o más roles"
                    />
                  </Box>
                  <Box mt={2}>
                    <Divider />
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
}

export default UserModification;
