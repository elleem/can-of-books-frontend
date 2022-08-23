import { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    //potential to build this out more
    
    return (
      <div>
    <p>App developed by Alejandro, Daniel, and Lauren</p>
    <Link to="/App">Home</Link>
    </div>

  )}
};

export default Profile;
