import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Moment from "moment";
import dateFormat from "dateformat";

import MUIDataTable from "mui-datatables";
import { IconButton, Grid, Card, Button, Switch, Alert } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import BaseLayout from "../../layouts/components/BaseLayout/BaseLayout";

function UserTable() {
  const navigate = useNavigate();
  const { isAuthenticated, getUsersList, userDeletation } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem("Token");

  useEffect(() => {
    async function fetchUsersList() {
      if (isAuthenticated) {
        const result = await getUsersList(token);
        setUsers(result.users);
        setLoading(false);
      } else {
        navigate("/pages/authentication/sign-in");
      }
    }
    fetchUsersList();
  }, []);

  const handleCreate = () => {
    navigate("/pages/createUser");
  };

  const handleInfo = (rowData) => {
    navigate("/pages/userDetails/" + `${rowData[0]}`);
  };

  const handleEdit = (rowData) => {
    navigate("/pages/userModification/" + `${rowData[0]}`);
  };

  const handleDelete = async (rowData) => {
    let confirm = window.confirm(
      "Está seguro que desea eliminar el usuario: " + rowData[1] + "?"
    );
    try {
      if (isAuthenticated && confirm) {
        let id = rowData[0];
        const result = await userDeletation(token, id);
        if (result !== null) {
          setUsers((users) => users.filter((u) => u.id !== id));
        } else {
          navigate("/pages/authentication/sign-in");
        }
      } else {
      }
    } catch (error) {}
  };

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "username",
      label: "Username",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "enabled",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <div>
              <Switch checked={value} color="warning" />
            </div>
          );
        },
      },
      label: "Habilitado",
    },
    {
      name: "date_password",
      label: "Fecha password",
      options: {
        customRowRender: ({ value }) => {
          if (value) {
            console.log("value", value);
            Moment(value, "mmmm dS, yyyy");
          } else {
            value = "N/A";
          }
        },
      },
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

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
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
                    Crear usuario
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
                      data={users}
                      options={options}
                      title="Usuarios"
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

export default UserTable;
