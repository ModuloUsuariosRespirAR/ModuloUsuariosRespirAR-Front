import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, Grid, Alert, Snackbar } from "@mui/material";

import { activateUser } from "../../../services/MailerService";

import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import Button from "../../../components/Button";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function ActivateUser() {
  const navigate = useNavigate();

  function ObtenerId() {
    let { id } = useParams();
    return id;
  }
  let userId = ObtenerId();

  //Alert
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await activateUser(userId);
      if (result.toString().includes("no fue encontrado")) {
        setAlert(true);
        setAlertContent(result);
        setAlertSeverity("error");
      } else {
        setAlert(true);
        setAlertContent(result);
        setAlertSeverity("success");
        setTimeout(() => navigate("/pages/authentication/sign-in"), 3000);
      }
    }
    fetchData();
  }, []);

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
                  Confirmación usuario
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Alert severity={alertSeverity} sx={{ width: "100%" }}>
                  {alertContent}
                </Alert>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
}

export default ActivateUser;
