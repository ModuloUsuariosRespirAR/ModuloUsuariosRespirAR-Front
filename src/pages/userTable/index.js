import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
    <div>
      <MUIDataTable
        columns={columns}
        data={data}
        options={options}
        title="Usuarios"
      />
    </div>
  );
}

export default UserTable;
