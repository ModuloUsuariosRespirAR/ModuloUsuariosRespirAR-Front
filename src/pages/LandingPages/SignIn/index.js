import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/UserContext";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function SignInBasic() {
  const navigate = useNavigate();

  const { loginUsuario } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginUsuario(username, password);
      if (result === null) {
        alert("No se pudo loguear");
      } else {
        navigate("/pages/users");
      }
    } catch (error) {}
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
                  Sign in
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="email"
                      label="Email"
                      fullWidth
                      onChange={handleUsernameChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="password"
                      label="Password"
                      fullWidth
                      onChange={handlePasswordChange}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" ml={-1}>
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                    />
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </Typography>
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      onClick={handleSubmit}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      sign in
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

export default SignInBasic;
