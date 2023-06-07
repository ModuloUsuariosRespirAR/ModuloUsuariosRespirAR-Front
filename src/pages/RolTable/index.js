import React, { useEffect, useState } from "react";

import MUIDataTable from "mui-datatables";
import { IconButton, Grid, Card, Button, Alert } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

import { useNavigate } from "react-router-dom";

import { getRoles, deleteRol } from "../../services/RolService";

function RolTable() {
  const navigate = useNavigate();

  let token = localStorage.getItem("Token");
  const [roles, setRoles] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRolesList = async () => {
    setLoading(true);
    if (token !== null) {
      const result = await getRoles(token);
      setRoles(result.roles);
      setLoading(false);
      console.log("Roles", roles);
    } else {
      navigate("/pages/authentication/sign-in");
    }
  };

  useEffect(() => {
    fetchRolesList();
  }, []);

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
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
                aria-label="info"
                onClick={() => handleInfo(tableMeta.rowData)}
              >
                <InfoIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
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
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" },
  ];

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
  };

  const handleInfo = (rowData) => {
    navigate("/pages/rolDetails/" + `${rowData[0]}`);
    window.location.reload();
  };

  const handleCreate = () => {
    navigate("/pages/createRol");
    window.location.reload();
  };

  const handleEdit = (rowData) => {
    navigate("/pages/rolModification/" + `${rowData[0]}`);
    window.location.reload();
  };

  const handleDelete = async (rowData) => {
    let confirm = window.confirm(
      "Está seguro que desea eliminar al Usuario: " + rowData[1] + "?"
    );

    try {
      if (token !== null && confirm) {
        const result = await deleteRol(token, rowData[0]);
        if (result !== null) {
          window.location.reload();
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  if (loading) {
    return <Alert severity="info">Data is loading...</Alert>;
  } else {
    return (
      <>
        <BaseLayout
          children={
            <>
              {" "}
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
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={11} sm={9} md={5} lg={11} xl={0}>
                  <Card>
                    <MUIDataTable
                      columns={columns}
                      data={roles}
                      options={options}
                      title="Roles"
                    />
                  </Card>
                </Grid>
              </Grid>
            </>
          }
        ></BaseLayout>
      </>
    );
  }
}

export default RolTable;
