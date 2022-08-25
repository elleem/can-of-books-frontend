import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Accordion from "react-bootstrap/Accordion";

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    //potential to build this out more
    
    return (
      <>
      <Accordion defaultActiveKey="0">
    <Link to="/App">Home</Link>
    <h5>App developed by Alejandro, Daniel, and Lauren</h5>
        <Accordion.Item >
        <Accordion.Header>Learn more about Alejandro</Accordion.Header>
        <Accordion.Body>Alejandro is a Software Developer with a background in interpreting and translations services in the medical field and legal affairs. He is fluent in Spanish and English. One of his greatest strengths is his ability to adapt quickly and efficiently to different work and social environments. He is passionate about using code to develop creative solutions to maximize user experience. </Accordion.Body>
    </Accordion.Item>
    </Accordion>
    <Accordion defaultActiveKey="1">
        <Accordion.Item >
        <Accordion.Header>Learn more about Daniel</Accordion.Header>
        <Accordion.Body>Daniel Brott is a software developer who has a background in I.T. infrastructure and has a long history of computer gaming and building computers. He believes the tech industry is becoming increasingly important in everyday life and wants to utilize his problem-solving skills in the software industry.</Accordion.Body>
    </Accordion.Item>
    </Accordion>
    <Accordion defaultActiveKey="2">
    <Accordion.Item >
        <Accordion.Header>Learn more about Lauren</Accordion.Header>
        <Accordion.Body> Lauren Main is a software developer with a background in project management and IT analysis. For the last six years, she has worked in public safety, with the King County Sheriff's Office in the Computer Resource Unit. She has gained expertise in IT project management, writing use cases, documenting software requirements, and user support. Something interesting that she just fixed at work is the King County crime map, which provides statistics on incidents throughout the County. Working closely with the vendor City Protect, she coordinated the backfill of the third-party API. </Accordion.Body>
    </Accordion.Item>
    </Accordion>
    </>
  )}
};

export default Profile;
