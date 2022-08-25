import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

class BookFormModal extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.value,
    };
    console.log("Here is our NEW Book: ", newBook);
    this.props.handleCreateBook(newBook);
    this.props.closeModal(); 
  };

  render() {
    return (
      <Container>
        <Modal show={this.props.showModal} onHide={this.props.handleClose} animation={false}>
        <Modal.Header closeButton onClick= {this.props.closeModal}/>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Book's Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="book's title goes here..."
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description of the book</Form.Label>
              <Form.Control
                type="text"
                placeholder="book's synopsis goes here."
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status of the book</Form.Label>
              <Form.Control
                type="text"
                placeholder="status of the book."
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">Add a book!</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    );
  }
}

export default BookFormModal;
