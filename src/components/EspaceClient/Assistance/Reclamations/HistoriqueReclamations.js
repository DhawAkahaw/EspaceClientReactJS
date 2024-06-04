import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons'; // Import tableIcons from its file

export default function Reclamation() {
    const [reclamation, setReclamation] = useState([]);
 

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/Reclamations_history/${userId}`)
                    .then(response => {
                        setReclamation(response.data.reclamation);
                    })
                    .catch(error => {
                        console.error('Error fetching raclamation:', error);
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
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Attribution</h6>,
                        render: rowData => <p>{rowData.Service}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Motif de réclamation	</h6>,
                        render: rowData => <p>{rowData.Motif}</p>
                    },
                    {
                      title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>GSM</h6>,
                      render: rowData => <p>{rowData.gsm}</p>
                  },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Date de création</h6>,
                        render: rowData => <p>{rowData.creation_date}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Etat</h6>,
                        render: rowData => <p>{rowData.State}</p>
                    },
                    {
                      title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>clear</h6>,
                      render: rowData => <p>{}</p>
                  },
                   
                ]}
                data={reclamation}
                title={<h4>Mes Reclamations</h4>}
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
