import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultipleSelectChip from "../../components/MultipleSelectChip";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function RolModification() {
  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  const id = ObtenerId();
  const url = "Agregar URL para obtener el rol con ese Id" + id;
  const [rol, setRol] = useState([]);
  const [permisos, setPermisos] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response.json().then((data) => {
          setRol(data);
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
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

  const handleChangePermisos = (event, value) => {
    setPermisos(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
                    Crear rol
                  </Typography>
                </Box>
                <Box pt={4} pb={3} px={3}>
                  <Box component="form" role="form">
                    <Box mb={2}>
                      <Input
                        type="text"
                        label="Rol"
                        fullWidth
                        value={rol}
                        onChange={(event) => setRol(event.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box mb={2}>
                      <MultipleSelectChip
                        options={permisosEjemplos}
                        label="Permisos"
                        placeholder="Seleccione uno o más permisos"
                        onChange={handleChangePermisos}
                      />
                    </Box>
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
    </>
  );
}

export default RolModification;
