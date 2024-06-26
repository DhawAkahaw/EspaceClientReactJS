
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoginScreen from './screens/LoginScreen';
import MasterLayout from './layouts/MasterLayout';
import axios from 'axios';
import Passwordscreen from './screens/Forgotpassword';
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const stripePromise = loadStripe('your_stripe_publishable_key');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {isAuthenticated ? <Redirect to="/espaceclient/dashboard" /> : <LoginScreen />}
          </Route>
          {/* Route for the Forgot password page */}
           <Route path="/forgot-password" exact component={Passwordscreen} />
          <Elements stripe={stripePromise}>
            <PrivateRoute path="/espaceclient" component={MasterLayout} isAuthenticated={isAuthenticated} />
          </Elements>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default App;
