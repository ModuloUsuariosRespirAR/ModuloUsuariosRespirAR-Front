import React from "react";

import MUIDataTable from "mui-datatables";
import { IconButton, Grid, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Box from "../../components/Box";

import bgImage from "../../assets/images/fiware.jpg";

import DefaultNavbar from "../../components/NavBar/DefaultNavBar";
import CenteredFooter from "../../components/Footer/CenteredFooter";

import routes from "../../routes";
import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserTable() {
  const columns = [
    {
      name: "username",
      label: "Username",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "rol",
      label: "Rol",
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <IconButton
                aria-label="delete"
                onClick={() => handleEdit(tableMeta.rowData)}
              >
                <EditIcon color="info" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(tableMeta.rowData)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const data = [
    { username: "FacundoCasas", email: "facundo@gmail.com", rol: "admin" },
    { username: "DonLuis", email: "don@gmail.com", rol: "user" },
    { username: "AgustinPascal", email: "agus@gmail.com", rol: "admin" },
    { username: "Anakin", email: "anakin@gmail.com", rol: "admin" },
    { username: "Lion", email: "Lion@gmail.com", rol: "user" },
    { username: "kaiju", email: "kaiju@gmail.com", rol: "admin" },
    { username: "Dormamu", email: "Dormamu@gmail.com", rol: "user" },
    { username: "RickSanchez", email: "rick@gmail.com", rol: "admin" },
  ];

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
  };

  const handleEdit = (rowData) => {
    console.log("Acción realizada:", rowData);
  };

  const handleDelete = (rowData) => {
    window.confirm(
      "Estas seguro que deseas eliminar al Usuario: " + rowData[0] + "?"
    );
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
        >
          <Grid item xs={11} sm={9} md={5} lg={11} xl={0}>
            <Card>
              <MUIDataTable
                columns={columns}
                data={data}
                options={options}
                title="Usuarios"
              />
            </Card>
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
}

export default UserTable;
