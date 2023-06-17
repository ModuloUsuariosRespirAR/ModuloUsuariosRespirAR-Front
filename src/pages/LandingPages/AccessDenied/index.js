import { Box } from "@mui/material";

import accessDenied from "../../../assets/images/accessDenied.jpeg";

import BaseLayout from "../../../layouts/components/BaseLayout/BaseLayout";

function AccessDenied() {
  return (
    <>
      <BaseLayout
        children={
          <Box
            minHeight="80vh"
            sx={{
              backgroundImage: ({
                functions: { linearGradient, rgba },
                palette: { gradients },
              }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0),
                  rgba(gradients.dark.state, 0)
                )}, url(${accessDenied})`,
              backgroundSize: "40%",
              backgroundPositionY: "center",
              backgroundPositionX: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        }
      ></BaseLayout>
    </>
  );
}
export default AccessDenied;
