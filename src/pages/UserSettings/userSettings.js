import { useState } from "react";

//import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";

//import CenteredFooter from "../../components/Footer/CenteredFooter";

import bgImage from "../../assets/images/fiware.jpg";
import { CheckBox } from "@mui/icons-material";

function UserSettings() {
  const [nombre, setName] = useState("");
  const [apellido, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };


  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <Box
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
        
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
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
                    <Input type="text" label="Username" fullWidth 
                      value={nombre}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input type="text" label="Nombre" fullWidth 
                      value={apellido}
                      onChange={(event) => setLastname(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input type="text" label="Apellido" fullWidth 
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input type="email" label="Email" fullWidth 
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input type="password" label="Password" fullWidth 
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" ml={0}>
                    <CheckBox/>
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
                    <Button variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                      Guardar
                    </Button>
                  </Box>
                  
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/*  <Box width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <CenteredFooter light />
      </Box> */}
    </>
  );
}

export default UserSettings;
