import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    
    return (
      <div>
    <p>App developed by Alejandro, Daniel, and Lauren</p>
    <Link to="/App">Home</Link>
    </div>

  )}
};

export default Profile;
