import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { detailRol } from "../../services/RolService";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function RolDetails() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  let token = localStorage.getItem("Token");
  const rolId = ObtenerId();
  const [rol, setRol] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const result = await detailRol(rolId, token);
      setRol(result.role);
    }
    fetchUserData();
  }, []);

  const permisosEjemplos = [
    {
      name: "Crear usuario",
      id: 1,
    },
    {
      name: "Editar usuario",
      id: 2,
    },
    {
      name: "Leer usuario",
      id: 3,
    },
    {
      name: "Borrar usuario",
      id: 4,
    },
  ];

  const handleEdit = (event) => {
    navigate("/pages/rolModification/" + rolId);
  };

  return (
    <>
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
                    Detalle rol
                  </Typography>
                </Box>
                <Box pt={4} pb={3} px={3}>
                  <Box component="form" role="form">
                    <Box mb={2}>
                      <Input
                        type="text"
                        label="Rol"
                        fullWidth
                        value={rol.name || ""}
                        disabled
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box mb={2}>
                      <MultipleSelectChip
                        options={permisosEjemplos}
                        label="Permisos"
                        placeholder="Seleccione uno o más permisos"
                        disabled="true"
                      />
                    </Box>
                  </Box>
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
    </>
  );
}

export default RolDetails;
