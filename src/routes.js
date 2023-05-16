import SignIn from "./layouts/pages/authentication/sign-in";

const routes = [
  {
    name: "Administrador",
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Usuarios",
        collapse: [
          {
            name: "Lista de usuarios",
            route: "/pages/landing-pages/usuarios",
            component: "",
          },
        ],
      },
      {
        name: "Roles",
        collapse: [
          {
            name: "Lista de roles",
            route: "/pages/authentication/roles",
            component: "",
          },
        ],
      },
    ],
  },
  {
    route: "/pages/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
