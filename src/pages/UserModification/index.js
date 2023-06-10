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
  Paper,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import { CheckBox } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

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
  const [habilitado, setHabilitado] = useState(false);
  const [roles, setRoles] = useState("");
  const [rolesBase, setRolesBase] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  let rolesEncontrados = [];

  let lista = [
    { id: 1, name: "Uno" },
    { id: 2, name: "Dos" },
    { id: 3, name: "Tres" },
  ];

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
    }
    fetchUserRoles();
  }, []);

  for (let i = 0; i < roles.length; i++) {
    for (let j = 0; j < rolesBase.length; j++) {
      if (roles[i].role_id === rolesBase[j].id) {
        rolesEncontrados.push(rolesBase[j]);
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
  };

  const handleChangeRoles = (event) => {
    rolesEncontrados = (rol) => ({
      ...rol,

      rolesEncontrados: event.target.value,
    });
  };

  const handleChangeRol = (event, value) => {
    rolesEncontrados = value;
    //setRoles(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    roles.map(async (rol) => {
      await assignRol(token, userId, rol.id);
    });
    navigate("/pages/users");

    try {
      if (token !== null) {
        const result = await userModification(token, userId, userInfo.username);
        if (!result.ok) {
          setAlert(true);
          setAlertContent("Error al modificar el usuario");
          throw new Error("Error al modificar el usuario");
        }
      } else {
        setAlert(true);
        setAlertContent("El usuario debe iniciar sesion");
      }
    } catch (error) {}
  };

  return (
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
                  Editar usuario
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Username"
                      name="username"
                      fullWidth
                      value={userInfo.username}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      value={userInfo.email}
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <MultipleSelectChip
                      label="Roles"
                      options={rolesBase}
                      placeholder="Seleccione uno o más roles"
                      value={rolesEncontrados}
                      onChange={handleChangeRoles}
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

export default UserModification;
