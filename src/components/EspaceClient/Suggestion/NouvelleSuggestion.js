import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import axios from "axios";
import swal from 'sweetalert';

export default function Suggestion() {
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
        Sugg_context:'',
        Subject:'',
        Message:'',
        Ticket:'',
        client_id:'',
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
                        id: res.data.currentuser._id,
                         
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

            const response = await axios.post(`api/Submitsuggestion/${formData.id}`, formDataToSend, {
                
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });
           

            if (response.status === 201) {
                swal("", response.data.message, "success");
                // Reset formData state
                setFormData({
                    Sugg_context:'',
                    Subject:'',
                    Message:'',
                    
                });
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
        
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form className="row justify-content-center" onSubmit={handleSubmit}>
            <div className="col-md-12">
                <div className="card mt-5">
                    <div className="card-body">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title mb-5">
                                <strong>Ajouter une nouvelle suggestion</strong>
                            </div>
                            <div className="ibox-content no-padding">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3">Contexte de suggestion *</div>
                                    <div className="col-lg-9 col-md-9">
                                        <div className="text-left">
                                            <select
                                                name="Sugg"
                                                className="form-control"
                                                required
                                                aria-required="true"
                                                value={formData.Sugg_context}
                                                onChange={(e) => setFormData({ ...formData, Sugg_context: e.target.value })}
                                            >
                                                <option value="0" selected>Sélectionnez une categorie</option>
                                                <option value="Commerciale">Commerciale</option>
                                                <option value="Technique">Technique</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-3 col-md-3">Sujet *</div>
                                    <div className="col-lg-9 col-md-9">
                                        <div className="text-right">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="sujet"
                                                id="sujet"
                                                required
                                                value={formData.Subject}
                                                aria-required="true"
                                                onChange={(e) => setFormData({ ...formData, Subject: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="Message" className="col-sm-3 col-form-label">Message *</label>
                                    <div className="col-sm-9">
                                        <textarea
                                            id="Message"
                                            name="Message"
                                            className="form-control"
                                            rows="5"
                                            value={formData.Message}
                                            placeholder="Type something..."
                                            onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-4 mt-5 text-right">
                <button type="submit">Modifier</button>
            </div>
        </form>
    );
}
