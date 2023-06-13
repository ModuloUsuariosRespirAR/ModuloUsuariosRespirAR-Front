import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { Link } from "react-router-dom";

const withLink = (to, children) => <Link to={to}>{children}</Link>;
const actions = [
  {
    icon: withLink("/pages/createUser", <GroupAddIcon color="secondary" />),
    name: "Crear usuario",
  },
  {
    icon: withLink("/pages/createRol", <AddModeratorIcon color="secondary" />),
    name: "Crear rol",
  },
];

export default function HomeSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 40, right: 16 }}
        icon={<SpeedDialIcon sx={{ fontSize: 25 }} />}
        FabProps={{
          sx: {
            bgcolor: "info.main",
            "&:hover": {
              bgcolor: "info.main",
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
