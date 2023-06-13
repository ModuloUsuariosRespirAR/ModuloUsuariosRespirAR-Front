import { useState, useEffect, useMemo } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/UserContext";
import { getRoles } from "../../services/RolService";

import { Grid, Card, Switch, FormControlLabel } from "@mui/material";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import { CheckBox } from "@mui/icons-material";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserSettings() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  let token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const userId = ObtenerId();
  const [userInfo, setUserInfo] = useState([]);
  const { userDetails, userRoles } = useAuth();
  const [rolesBase, setRolesBase] = useState([]);
  const [roles, setRoles] = useState([]);
  let rolesEncontrados = [];

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

  if (roles !== "" && roles !== undefined && roles !== null) {
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < rolesBase.length; j++) {
        if (roles[i].role_id === rolesBase[j].id) {
          rolesEncontrados.push(rolesBase[j]);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const result = await userDetails(token, userId);
      setUserInfo(result.user);
    }
    fetchUserData();
  }, []);

  const handleEdit = (event) => {
    navigate("/pages/userModification/" + userId);
    window.location.reload();
  };

  return (
    <>
      <BaseLayout>
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
                  Detalle usuario
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Username"
                      fullWidth
                      value={userInfo.username || ""}
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      value={userInfo.email || ""}
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <MultipleSelectChip
                      label="Roles"
                      value={rolesEncontrados}
                      defaultValue={rolesEncontrados}
                      disabled="true"
                      freeSolo="true"
                      limitTags={3}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      label="Habilitado"
                      disabled="true"
                      control={
                        <Switch checked={userInfo.enabled} color="warning" />
                      }
                    />
                  </Box>
                </Box>
                {/* <Box display="flex" alignItems="center" ml={0}>
                  <CheckBox disabled />
                  <Typography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Cuenta Verificada
                  </Typography>
                </Box> */}
                <Box mt={4} mb={1}>
                  <Button
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleEdit}
                  >
                    Editar
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

export default UserSettings;
