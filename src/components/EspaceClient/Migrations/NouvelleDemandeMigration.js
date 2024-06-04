
import React, { useState, useEffect } from 'react';

 import Loading from './/Loading';
 import axios from "axios";
import swal from 'sweetalert';



export default function Profile() {
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        tel: '',
        rue: '',
        gouvernorat: '',
        delegation: '',
        localite: '',
        ville: '',
        code_postal: '',
        gsm: '',
        login: '',
        password: '',
        code_Client: '',
        type_Client: '',
        id: '',
        current_offre:'',
        desired_offre:'',
        Service:'',
        message:'',
        Ticket:'',
        State:'',
        client_id:'',
        Contract:''
    });
    const [token, setToken] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        // Fetch current user data
        axios.get('api/currentuser')
            .then(res => {
                if (res.data.status === 200) {

                    setFormData(prevState => ({
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
                    setLoading(false);

                } else if (res.data.status === 404) {
                    // If user not found, show an error message
                    swal("", res.data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
          
            const response = await axios.post(`api/Submitmigration/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                swal("", response.data.message, "success");
                this.setState({
                  offre: '',
                  Motif_demand: '',
                  Message: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to get cities by governorate
  


    if (loading) {
        <Loading />
    }

    return (



        <form className="row justify-content-center" onSubmit={handleSubmit}>
            {loading ? (
                <Loading />
                ) : (
                <>
                    <div className="col-md-12">
                       
                        <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Informations du compte</strong>
                                    </div>
                                    -----------------------------
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">contract *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <select name="offre" className="form-control" required="" aria-required="true" onChange={(e) => setFormData({ ...formData, Contract: e.target.value })}>
                                                        <option value='0'>Choisir l'Offre</option>
                                                        <option value={formData.tel}>{formData.tel}</option>
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                          </div>
--------------------------------------------------------
                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Offre actuelle *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="Service" className="form-control" required="" aria-required="true" onChange={(e) => setFormData({ ...formData, current_offre: e.target.value })}>
                                                        <option value='0'>Choisir le Service</option>
                                                        <option value={formData.tel}>{formData.tel}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
---------------------------------------------------------
                                              <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Offre cible *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="Service" className="form-control" required="" aria-required="true" onChange={(e) => setFormData({ ...formData,desired_offre: e.target.value })}>
                                                        <option value='0'>Choisir le Service</option>
                                                        <option value='Fidélité SMART RAPIDO 100M (sans voix)'> Fidélité SMART RAPIDO 100M (sans voix)</option>
                                                        <option value='Fidélité SMART RAPIDO 20M (Sans Voix)'> Fidélité SMART RAPIDO 20M (Sans Voix)</option>
                                                        <option value='Fidélité SMART RAPIDO 30M (sans voix)'> Fidélité SMART RAPIDO 30M (sans voix)</option>
                                                        <option value=' PROMO SMART ADSL 10M'> PROMO SMART ADSL 10M</option>
                                                        <option value=' PROMO SMART ADSL 12M'> PROMO SMART ADSL 12M</option>
                                                        <option value=' PROMO SMART ADSL 20M'> PROMO SMART ADSL 20M</option>
                                                        <option value=' PROMO SMART RAPIDO 20M (Sans Voix)'> PROMO SMART RAPIDO 20M (Sans Voix)</option>
                                                        <option value=' PROMO SMART RAPIDO 30M (Sans Voix)'>  PROMO SMART RAPIDO 30M (Sans Voix)</option>
                                                        <option value=' SMART ADSL 10M'> SMART ADSL 10M</option>
                                                        <option value=' SMART ADSL 12M'> SMART ADSL 12M</option>
                                                        <option value=' SMART ADSL 20M'> SMART ADSL 20M</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
 -------------------------------------- --------------------------------------
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                          

                        
                        
                    </div>

                    <div className='col-sm-4 mt-5 text-right'>
                        <button type="submit" >Modifier</button>
                    </div>
                    </>
            )}

        </form>





    );
}
