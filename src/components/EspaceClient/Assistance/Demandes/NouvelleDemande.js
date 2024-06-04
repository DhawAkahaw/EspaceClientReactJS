import React, { Component } from 'react';
import axios from 'axios';

class DemandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reference: '',
      Motif_demand: '',
      Message: '',
      clientId: '',
      Tel:''// Adding clientId to the state
    };
  }

  componentDidMount() {
    axios.get('api/currentuser')
      .then(response => {
        const userId = response.data.currentuser._id;
        axios.get(`api/client/${userId}`)
          .then(response => {
            const clientId = response.data.clientId;
            const Tel = response.data.Tel;  
            this.setState({ clientId, Tel }); // Setting both clientId and Tel in state
          })
          .catch(error => {
            console.error('Error fetching demands history:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
}


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      Tel: value,
      [name]: value,
       
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
  
    const { Reference, Motif_demand, Message, clientId } = this.state;
  
    try {
      const responseCurrentUser = await axios.get('api/currentuser');
      const userId = responseCurrentUser.data.currentuser._id;
      const response = await axios.post(`/api/Submitdemand/${userId}`, {
        Reference,
        Motif_demand,
        Message,
        clientId
      });
  
      if (response.status === 201) {
        console.log('Demand added successfully');
        this.setState({
          Reference: '',
          Motif_demand: '',
          Message: ''
        });
      } else {
        console.error('Failed to add demand');
      }
    } catch (error) {
      console.error('Error adding demand:', error.response || error.message);
    }
  };

  render() {
    const { Reference, Motif_demand, Message , Tel } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h4>Ajouter une demande</h4>
          </div>
          <div className="card-body">
            <div className="mb-3 row">
              <label htmlFor="Reference" className="col-sm-3 col-form-label">Reference</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="Reference"
                  name="Reference"
                  value={Reference}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Motif_demand" className="col-sm-3 col-form-label">Motif demande</label>
              <div className="col-sm-9">
                <select
                  name="Motif_demand"
                  className="form-control"
                  value={Tel}
                  onChange={this.handleInputChange}
                >
                  <option value="">Chosir le motif demande</option>
                  <option value="Demande Activation IPV6">Demande Activation IPV6</option>
                  <option value="Demande de suspensionDemande de suspension">Demande de suspension</option>
                  <option value="Demande édition facture">Demande édition facture</option>
                  <option value="Demande de paramètres">Demande de paramètres</option>
                  <option value="Demande changement de raison sociale">Demande changement de raison sociale</option>
                  <option value="Demande d’annulation de suspension">Demande d’annulation de suspension</option>
                  <option value="Demande réactivation abonnement">Demande réactivation abonnement</option>
                  <option value="Demande changement de fréquence de facturation/">Demande changement de fréquence de facturation</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Message" className="col-sm-3 col-form-label">Message</label>
              <div className="col-sm-9">
                <textarea
                  id="Message"
                  name="Message"
                  className="form-control"
                  value={Message}
                  onChange={this.handleInputChange}
                  rows="5"
                  placeholder="Type something..."
                />
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default DemandForm;