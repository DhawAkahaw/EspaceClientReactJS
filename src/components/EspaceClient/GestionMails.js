import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons'; // Import tableIcons from its file
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


export default function Mail() {
    const [mail, setMail] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [newMail, setNewMail] = useState({
      mail: '',
      mail_rec: '',
      new_num_tel: '',
      State: '',
      domaine: '',
      client_id: '',
      Option:'Topnet.tn',
      pass:'',
      pass1:''
  });
  
    
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    // Fetch current user data
    axios.get('api/currentuser')
        .then(res => {
            if (res.data.status === 200) {

                setNewMail(prevState => ({
                    ...prevState,
                    name: res.data.currentuser.name,
                    lastName: res.data.currentuser.last_name,
                    rue: res.data.currentuser.rue,
                    gouvernorat: res.data.currentuser.gouvernorat,
                    delegation: res.data.currentuser.delegation,
                    localite: res.data.currentuser.localite,
                    ville: res.data.currentuser.ville,
                    code_postal: res.data.currentuser.code_postal,
                    tel: res.data.currentuser.tel,
                    gsm: res.data.currentuser.gsm,
                    login: res.data.currentuser.login,
                    password: res.data.currentuser.password,
                    picture: res.data.currentuser.picture,
                    code_Client: res.data.currentuser.code_Client,
                    type_Client: res.data.currentuser.type_Client,
                    id: res.data.currentuser._id
                }));
               
                setToken(token);
                

            } else if (res.data.status === 404) {
                // If user not found, show an error message
                swal("", res.data.message, "error");
            }
        })
        .catch(error => {
            console.error('Error fetching current user:', error);
        });
}, []);


    useEffect(() => {


        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/maillist/${userId}`)
                    .then(response => {
                        setMail(response.data.mail);
                    })
                    .catch(error => {
                        console.error('Error fetching mail:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };



    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddMail = async () => {
      try {
          const concatenatedMail = `${newMail.mail}@${newMail.domaine}`;
          if (newMail.pass !== newMail.pass1) {
            swal("", "Passwords do not match", "error");
            return;
        }
          const newData = {
              ...newMail,
              mail: concatenatedMail
          };
  
          const response = await axios.post(`api/addmail/${newData.id}`, newData);
  
          if (response.status === 201) {
              swal("", response.data.message, "success");
              // Clear the form and update the mail list
              setNewMail({
                  mail: '',
                  mail_rec: '',
                  new_num_tel: '',
                  State: '',
                  domaine:'',
                  pass:'',
                  pass:''
              });
              // Fetch updated mail list
              const userId = response.data.currentuser._id;
              axios.get(`api/maillist/${userId}`)
                  .then(response => {
                      setMail(response.data.mail);
                  })
                  .catch(error => {
                      console.error('Error fetching mail:', error);
                  });
          }
      } catch (error) {
          console.error('Error:', error);
      }
      setOpenDialog(false);
  };
  

    return (
      <form className="row justify-content-center" >
        <div className="col-md-12">                    
        <div className="card mt-5">
        <div className="align-items-center justify-content-between mb-4">
            
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Adresse</h6>,
                        render: rowData => <p>{rowData.mail}</p>,
                        customFilterAndSearch: (term, rowData) => ((rowData.mail).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Email de récupération</h6>,
                        render: rowData => <p>{rowData.mail_rec}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Quota utilisé</h6>,
                        render: rowData => <p>{rowData.new_num_tel}</p>
                    }, {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Statut</h6>,
                        render: rowData => <p>{rowData.State}</p>
                    },
                ]}
                data={mail}
                title={<h4>Mes mail</h4>}
                icons={tableIcons} // Use the imported tableIcons
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Mail</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mail"
                        name="mail"
                        label="Adresse email *"
                        type="email"
                        fullWidth
                        value={newMail.mail}
                        onChange={(e) => setNewMail({ ...newMail, mail: e.target.value })}
                    />
                    <FormControl fullWidth>
                    <InputLabel id="status-label">domaine</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={newMail.domaine}
                        onChange={(e) => setNewMail({ ...newMail, domaine: e.target.value })}
                    >
                        
                            <MenuItem  value={newMail.Option}>{newMail.Option}</MenuItem>
                       
                    </Select>
                </FormControl>
                    <TextField
                        margin="dense"
                        id="mail_rec"
                        name="mail_rec"
                        label="Email de récupération"
                        type="email"
                        fullWidth
                        value={newMail.mail_rec}
                        onChange={(e) => setNewMail({ ...newMail, mail_rec: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="pass"
                        name="pass"
                        label="Mot de passe *"
                        type={showPassword ? "text" : "password"}
                        
                        value={newMail.pass}
                        onChange={(e) => setNewMail({ ...newMail, pass: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="pass1"
                        name="pass1"
                        label="Confirmation de mot de passe * "
                        type={showPassword ? "text" : "password"}
                        
                        value={newMail.pass1}
                        onChange={(e) => setNewMail({ ...newMail, pass1: e.target.value })}
                    />
                    <Button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
                </DialogContent>

                
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleAddMail} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            
            <div className="card-footer text-center">
            <Button variant="contained" color="primary" style={{ margin: '5px', padding: '10px', backgroundColor: '#f48404', color: 'white' }} onClick={handleOpenDialog}>Add New Mail</Button>
                        </div>

            
            </div></div></div>
        </form>
    );
}
