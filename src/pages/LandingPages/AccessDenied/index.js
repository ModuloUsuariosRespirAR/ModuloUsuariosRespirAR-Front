import { Box, Typography } from "@mui/material";

import accessDenied from "../../../assets/images/accessDenied.jpeg";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function AccessDenied() {
  return (
    <>
      <BaseLayout
        children={
          <>
            <Box
              minHeight="60vh"
              sx={{
                backgroundImage: ({
                  functions: { linearGradient, rgba },
                  palette: { gradients },
                }) =>
                  `${linearGradient(
                    rgba(gradients.dark.main, 0),
                    rgba(gradients.dark.state, 0)
                  )}, url(${accessDenied})`,
                backgroundSize: "30%",
                backgroundPositionY: "center",
                backgroundPositionX: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {" "}
              <Typography variant="h2" component="h2" align="center" mt={20}>
                No puede realizar la acción <br />
                requerida
              </Typography>
            </Box>
          </>
        }
      ></BaseLayout>
    </>
  );
}
export default AccessDenied;
