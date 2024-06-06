
import React, { useState, useEffect } from 'react';

 import Loading from './/Loading';
 import axios from "axios";
import swal from 'sweetalert';
import { GovDeleg } from '../GovDeleg';


export default function Line() {
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
        adsl_num:'',
        new_num_tel:'',
        prev_num:'',
        Remarque:'',
        Ticket:'',
        State:'',
        client_id:'',
        
    });
    const [formSave, setFormSave] = useState({
        
        
        rue: '',
        gouvernorat: '',
        delegation: '',
        localite: '',
        ville: '',
        code_postal: '',
    
        
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
                    setFormSave(prevState => ({
                        ...prevState,
                       
                        rue: res.data.currentuser.rue,
                        gouvernorat: res.data.currentuser.gouvernorat,
                        delegation: res.data.currentuser.delegation,
                        localite: res.data.currentuser.localite,
                        ville: res.data.currentuser.ville,
                        code_postal: res.data.currentuser.code_postal,
                        
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
            const response = await axios.post(`api/Submitline/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setFormData({
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
                    adsl_num:'',
                    new_num_tel:'',
                    prev_num:'',
                    Remarque:'',
                    Ticket:'',
                    State:'',
                    
                    
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to get cities by governorate
  


    function getCitiesByGovernorate(data) {
      const citiesByGovernorate = {};
      data.forEach(entry => {
          const { Gov, Deleg } = entry;
          if (!citiesByGovernorate[Gov]) {
              citiesByGovernorate[Gov] = [Deleg];
          } else {
              if (!citiesByGovernorate[Gov].includes(Deleg)) {
                  citiesByGovernorate[Gov].push(Deleg);
              }
          }
      });
      return citiesByGovernorate;
  }

  const citiesByGovernorate = getCitiesByGovernorate(GovDeleg);


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
 -----------------------------------------------------------------------------------------
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-sm-2 control-label">Numéro ADSL *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <select name="offre" className="form-control" required="" aria-required="true"value={formData.adsl_num} onChange={(e) => setFormData({ ...formData, adsl_num: e.target.value })} >
                                                        <option value='0'>Choisir le numero</option>
                                                        <option value={formData.tel}>{formData.tel}</option>
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                          </div>
                                          -------------------------------------------------
                                          <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Nouveau numéro de téléphone * </div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-left">
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        name="num"
                                                        id="num"
                                                        required=""
                                                        aria-required="true"
                                                        value={formData.new_num_tel}
                                                        onChange={(e) => setFormData({ ...formData, new_num_tel: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
----------------------------------------------------------
                                            <div className="row mt-3">
                                            <div className="col-sm-2 control-label"> </div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-left">
                                                <input type="radio" value="Oui" name="gender" /> Oui
                                                <input type="radio" value="Non" name="gender" /> Non
                                                </div>
                                            </div>
                                        </div>
------------------------------------------------------------
                                              <div className="row">
                                            <div className="col-sm-2 control-label">CIN</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-left">
                                                <input type="file" name="picture" onChange={handleImage} />  
                                                </div>
                                            </div>
                                          </div>
------------------------------------------------------------------

                                            <div className="row mt-3">
                                            <div className="col-sm-2 control-label"> </div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-left">
                                                <input type="checkbox" value="quest" name="quest" /> Voulez vous garder la même adresse?
                                                
                                                </div>
                                            </div>
                                        </div>
------------------------- --------------------------------

<div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Adresse actuelle</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-sm-2 control-label">Rue *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="rue"
                                                        id="rue"
                                                        value={formSave.rue}
                                                        required=""
                                                        aria-required="true"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Gouvernorat *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="gouvernorat" className="form-control" required="" aria-required="true" value={formSave.gouvernorat} >
                                                        <option value=""  selected>{formSave.gouvernorat}</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Délégation *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="delegation"
                                                        className="form-control"
                                                        required=""
                                                        aria-required="true"
                                                        value={formSave.delegation}
                                                    >
                                                        <option value="" selected>{formSave.delegation}</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Ville *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="ville" id="ville" value={formSave.ville} required="" aria-required="true"  />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Code postal *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="code_postal" id="code_postal" value={formSave.code_postal} required="" aria-required="true"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
------------------------------------------------------------
                          <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Nouvelle adresse</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-sm-2 control-label">Rue *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="rue"
                                                        id="rue"
                                                        value={formData.rue}
                                                        required=""
                                                        aria-required="true"
                                                        onChange={(e) => setFormData({ ...formData, rue: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Gouvernorat *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="gouvernorat" value={formData.gouvernorat}className="form-control" required="" aria-required="true"  onChange={(e) => setFormData({ ...formData, gouvernorat: e.target.value })}>
                                                        <option value=""  selected>Sélectionnez un gouvernorat</option>
                                                        {Object.keys(citiesByGovernorate).map((gov, index) => (
                                                            <option key={index} value={gov}>{gov}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Délégation *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="delegation"
                                                        className="form-control"
                                                        required=""
                                                        aria-required="true"
                                                        value={formData.delegation}
                                                        onChange={(e) => setFormData({ ...formData, delegation: e.target.value })}
                                                    >
                                                        <option value="" selected>Sélectionnez une délégation</option>
                                                        {formData.gouvernorat && citiesByGovernorate[formData.gouvernorat] && citiesByGovernorate[formData.gouvernorat].map((deleg, index) => (
                                                            <option key={index} value={deleg}>{deleg}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Ville *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="ville" id="ville"  required="" aria-required="true" value={formData.ville}onChange={(e) => setFormData({ ...formData, ville: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-2 control-label">Code postal *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="code_postal" id="code_postal"  required="" aria-required="true" value={formData.code_postal}onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                        <button type="submit" >Envoyer</button>
                    </div>
                    </>
            )}

        </form>





    );
}
