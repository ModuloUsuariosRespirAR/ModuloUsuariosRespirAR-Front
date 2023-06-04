import React from "react";

import MUIDataTable from "mui-datatables";
import { IconButton, Grid, Card, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

import { useNavigate } from "react-router-dom";

function UserTable() {
  const navigate = useNavigate();

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
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
    { id: 1, rol: "Administrador" },
    { id: 2, rol: "Usuario" },
  ];

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
  };

  const handleCreate = () => {
    navigate("/pages/createRol");
    window.location.reload();
  };

  const handleEdit = (rowData) => {
    navigate("/pages/rolSettings/" + `${rowData[0]}`);
    window.location.reload();
  };

  const handleDelete = (rowData) => {
    window.confirm(
      "Estas seguro que deseas eliminar el rol: " + rowData[1] + "?"
    );
  };

  return (
    <>
      <BaseLayout>
        <Grid
          container
          justifyContent="right"
          marginLeft="-85px"
          marginBottom="5px"
        >
          <Grid item xs={0} sm={0} md={0} lg={0} xl={0}>
            <Button
              variant="contained"
              color="primary"
              size="meduim"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Crear rol
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={11} sm={9} md={5} lg={11} xl={0}>
            <Card>
              <MUIDataTable
                columns={columns}
                data={data}
                options={options}
                title="Roles"
              />
            </Card>
          </Grid>
        </Grid>
      </BaseLayout>
    </>
  );
}

export default UserTable;
