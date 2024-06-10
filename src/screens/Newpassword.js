import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from '../../Footer'

export default function Resetforgottenpassword() {



    const history = useHistory();

    const { id } = useParams();
    const [resetforgottenpasswordInput, setResetforgottenpassword] = useState({

        token: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setResetforgottenpassword({ ...resetforgottenpasswordInput, [e.target.name]: e.target.value });
    }

    const resetforgottenpasswordSubmit = (e) => {
        e.preventDefault();


        const data = {

            token: id,
            password: resetforgottenpasswordInput.password,
            password_confirmation: resetforgottenpasswordInput.password_confirmation
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/reset-forgottenpassword', data).then(res => {


                if (res.data.status === 200) {

                    swal("Félicitations", res.data.message, "success");
                    history.push("/auth-topnet");
                }
                else {
                    setResetforgottenpassword({ ...resetforgottenpasswordInput, error_list: res.data.validation_errors });
                }
            });
        });



    }

    return (
        <div style={{ backgroundColor: '#081339' }}>
            <section >
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0 mt-sm-9  mb-4">
                                <div className="card-header text-center pt-4 pb-1">
                                    <h3 className="font-weight-bolder mb-1">Réinitialiser votre mot de passe</h3>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={resetforgottenpasswordSubmit} >

                                        <div className="mb-3">
                                            <label className="form-label">Nouveau mot de passe</label>
                                            <input name="password" onChange={handleInput} value={resetforgottenpasswordInput.password} autoComplete="on" className="form-control" placeholder="Mot de passe" type="password" required />
                                            <span className="text-danger">{resetforgottenpasswordInput.error_list.password}</span>

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Confirmer le nouveau mot de passe</label>
                                            <input name="password_confirmation" onChange={handleInput} value={resetforgottenpasswordInput.password_confirmation} autoComplete="on" className="form-control" placeholder="Confirmation du mot de passe" type="password" required />
                                            <span className="text-danger">{resetforgottenpasswordInput.error_list.password}</span>

                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-info btn-lg w-100 my-4 mb-2">Réinitialiser le mot de passe!</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>

    )
}