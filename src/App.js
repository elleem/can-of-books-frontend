import React from 'react';
import Header from './Header';
import Footer from './Footer';
import About from './About'; 
import {withAuth0} from '@auth0/auth0-react'
import BestBooks from './BestBooks';
import Login from './Login'; 
import Logout from './Logout'; 
import Profile from './Profile'; 
import Welcome from './Welcome'; 
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
     
        
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={ this.props.auth0.isAuthenticated ? 
              <>
              <Logout/>
              <Profile/>
              <BestBooks/>
              </>
              : 
              <>
              <Login/>
            <Welcome/>
            </>}
            >
            </Route>
            <Route
              exact path="/About"
              element={<About />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
