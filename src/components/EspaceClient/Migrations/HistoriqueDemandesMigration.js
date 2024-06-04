import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons'; // Import tableIcons from its file

export default function Migrations() {
    const [migration, setMigration] = useState([]);

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/Migrations_history/${userId}`)
                    .then(response => {
                        setMigration(response.data.migration);
                    })
                    .catch(error => {
                        console.error('Error fetching migrations:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);
    
    return (
        <div className="align-items-center justify-content-between mb-4">
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Ticket</h6>,
                        render: rowData => <p>{rowData.Ticket}</p>,
                        customFilterAndSearch: (term, rowData) => ((rowData.Ticket).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Offre actuelle</h6>,
                        render: rowData => <p>{rowData.current_offre}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Offre cible</h6>,
                        render: rowData => <p>{rowData.desired_offre}</p>
                    }, {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Date de création	</h6>,
                        render: rowData => <p>{rowData.created_at}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Gsm</h6>,
                        render: rowData => <p>{rowData.gsm}</p>
                    },
                   
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Remarque</h6>,
                        render: rowData => <p>{rowData.message}</p>
                    },
                   
                ]}
                data={migration}
                title={<h4>Mes migrations</h4>}
                icons={tableIcons} // Use the imported tableIcons
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />
        </div>
    );
}
