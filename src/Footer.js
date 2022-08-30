import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="info" variant="light">
        <Navbar.Brand style = {{paddingLeft: '1.5rem'}}>Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}
export default Footer;
