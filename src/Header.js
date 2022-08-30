import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="info" variant="primary">
        <Navbar.Brand id="header-navbar"style={{paddingLeft: '8rem', margin: 'auto', fontSize:'2rem', fontWeight:'bolder'}}>My Favorite Books</Navbar.Brand>
        <NavItem style = {{paddingRight: '2rem', fontSize:'1.25rem'}}><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem style = {{paddingRight: '2rem', fontSize:'1.25rem', }}><Link to="/About" className="nav-link" id="about-nav">About</Link></NavItem>
      </Navbar>
    )
  }
}

export default Header;
