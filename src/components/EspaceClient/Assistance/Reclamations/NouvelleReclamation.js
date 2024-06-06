
import React, { useState, useEffect } from 'react';

 import Loading from './/Loading';
 import axios from "axios";
import swal from 'sweetalert';



export default function Reclamation() {
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
        offre:'',
        Service:'',
        Category:'',
        Motif_rec:'',
        Image:'',
        Message:'',
        Ticket:'',
        State:'',
        client_id:''
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

    const handleImage = (e) => {
        setFormData(prevState => ({
            ...prevState,
            picture: e.target.files[0]
        }));
    };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            formDataToSend.append('picture', formData.picture);
            const response = await axios.post(`api/Submitreclamation/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setFormData({
                    offre:'',
                    Service:'',
                    Category:'',
                    Motif_rec:'',
                    Image:'',
                    Message:'',
                    
                })
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
                                            <div className="col-lg-3 col-md-3">Offre*</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <select name="offre" className="form-control" required="" value={formData.offre} aria-required="true" onChange={(e) => setFormData({ ...formData, offre: e.target.value })}>
                                                        <option value='0'selected >Choisir l'Offre</option>
                                                        <option value={formData.tel}>{formData.tel}</option>
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                          </div>
--------------------------------------------------------
                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Service*</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="Service" className="form-control" required="" value={formData.Service} aria-required="true" onChange={(e) => setFormData({ ...formData, Service: e.target.value })}>
                                                        <option value='0'selected>Choisir le Service</option>
                                                        <option value='1'>Commerciale</option>
                                                        <option value='2'>Technique</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
---------------------------------------------------------
                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Categorie*</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="categorie" className="form-control" required="" aria-required="true" value={formData.Category} onChange={(e) => setFormData({ ...formData, Category: e.target.value })}>
                                                        <option value="0"  selected>Sélectionnez une categorie</option>
                                                        <option value="gen" >Generalite</option>
                                                        <option value="ads"  >ADSL&Options</option>
                      
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
------------------------------------------------------------
                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Motif de reclamation</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <select
                                                        name="Motif" className="form-control" required="" aria-required="true" value={formData.Motif_rec}onChange={(e) => setFormData({ ...formData, Motif_rec: e.target.value })}>
                                                        <option value="0"  selected>Sélectionnez une categorie</option>
                                                        <option value="faccon" >Facture non conforme (prix non adéquat)</option>
                                                        <option value="nof"  >Non réception facture</option>
                      
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
----------------------------------------------------
                                                    
                                                      <div className="card-body">
                                                    <div className="ibox float-e-margins">
                                                        
                                                        <div className="ibox-content no-padding">
                                                            <div className="row">

                                                                <div className="col-lg-9 col-md-9">
                                                                    <div className="text-left">
                                                                    
                                                                        <input type="file" value={formData.Image} name="picture" onChange={handleImage} />          

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            

-----------------------------------------------------
                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Numero GSM</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="gsm" id="gsm" value={formData.gsm} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, gsm: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
 -------------------------------------- --------------------------------------
                                        <div className="mb-3 row">
                                        <label htmlFor="Message" className="col-sm-3 col-form-label">Message</label>
                                        <div className="col-sm-9">
                                          <textarea
                                            id="Message"
                                            name="Message"
                                            className="form-control"
                                            rows="5"
                                            placeholder="Type something..."
                                            value={formData.Message}
                                            onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                          

                        
                        
                    </div>

                    <div className='col-sm-4 mt-5 text-right'>
                        <button type="submit" >Envoyer</button>
                    </div>
                    </>
            )}

        </form>





    );
}
