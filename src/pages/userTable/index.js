import React from 'react'
import MUIDataTable from "mui-datatables";
import {Button} from "@mui/material";

function UserTable() {

    const columns = [
        {
            name: "username",
            label: "Username"
        },
        {
            name: "email",
            label: "Email"
        },
        {
            name: "rol",
            label: "Rol"
        },
        {
            name: "acciones",
            label: "Acciones",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAction(tableMeta.rowData)}
                            >
                                Editar Usuario
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAction(tableMeta.rowData)}
                            >
                                Eliminar Usuario
                            </Button>
                        </>

                    );
                },
            },
        },
    ];

    const data = [
        {username:'FacundoCasas',email:'facundo@gmail.com',rol:'admin'},
        {username:'DonLuis',email:'don@gmail.com',rol:'user'},
        {username:'AgustinPascal',email:'agus@gmail.com',rol:'admin'},
        {username:'Anakin',email:'anakin@gmail.com',rol:'admin'},
        {username:'Lion',email:'Lion@gmail.com',rol:'user'},
        {username:'kaiju',email:'kaiju@gmail.com',rol:'admin'},
        {username:'Dormamu',email:'Dormamu@gmail.com',rol:'user'},
        {username:'RickSanchez',email:'rick@gmail.com',rol:'admin'},
    ];

    const options = {
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        responsive: 'vertical',
        rowsPerPage: 10,
    };

    const handleAction = (rowData) => {
        // Aquí puedes realizar la lógica deseada en función de los datos de la fila seleccionada
        console.log("Acción realizada:", rowData);
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
