import UserTablePage from "./layouts/pages/userTable";
import RolTablePage from "./layouts/pages/rolTable";
import Icon from "@mui/material/Icon";

const routes = [
  {
    name: "Administrador",
    icon: <Icon>admin_panel_settings</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Usuarios",
        icon: <Icon>group</Icon>,
        collapse: [
          {
            name: "Lista de usuarios",
            route: "/pages/users",
            component: <UserTablePage />,
          },
        ],
      },
      {
        name: "Roles/Permisos",
        collapse: [
          {
            name: "Lista de roles",
            route: "/pages/roles",
            component: <RolTablePage />,
          },
          {
            name: "Lista de permisos",
            route: "/pages/permisos",
            component: "",
          },
        ],
      },
    ],
  },
];

export default routes;
