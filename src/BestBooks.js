import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import BookFormModal from "./BookFormModal";
import Button from "react-bootstrap/Button";
import UpdateBookModal from "./UpdateBookModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: "",
      showForm: false,
      updateForm: false,
    };
  }
  
  componentDidMount = async () => {
    try {
      const config = {
        method: "get", // get is default behavior
        baseURL: process.env.REACT_APP_HEROKU,
        url: "/books",
      };

      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: response.data });
    } catch (error) {
      console.error(
        "Error is in the componentDidMount Function: ",
        error.response
      );
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  handleCreateBook = async (createBook) => {
    try {
      const config = {
        method: "post",
        baseURL: process.env.REACT_APP_HEROKU,
        url: "/books",
        data: createBook,
      };
      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: [...this.state.books, response.data] });
      console.log(this.state.books);
    } catch (error) {
      console.error("error in the handleCreateBook function: ", error);
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  closeModal = () => {
    this.setState({ showForm: false });
  };

  showModal = () => {
    this.setState({ showForm: true });
  };

  closeUpdateModal = () => {
    this.setState({ updateForm: false });
  };

  showUpdateModal = () => {
    this.setState({ updateForm: true });
  };

  handleDeleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(
        `Do you wish to delete ${bookToBeDeleted.title}?`
      );

      if (proceed) {
        const config = {
          method: "delete",
          baseURL: process.env.REACT_APP_HEROKU,
          url: `/books/${bookToBeDeleted._id}?queryParam=value`,
        };

        const response = await axios(config);
        console.log(response.data);
        const newBooksArray = this.state.books.filter(
          (book) => book._id !== bookToBeDeleted._id
        );
        this.setState({ books: newBooksArray });
      }
    } catch (error) {
      console.error(
        "Error is in the App.js in the deleteBook Function: ",
        error
      );
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  handleUpdateBook = async (updateBook) => {
    try {
      const updatedBook = this.state.books.map((existingBook) => {
        if (existingBook._id === updateBook._id) {
          return updateBook;
        } else {
          return existingBook;
        }
      });
      this.setState({
        books: updatedBook,
      });
      console.log("updatedbook", updatedBook); 
      console.log("books variable", updateBook); 
      await axios.put(
        `${process.env.REACT_APP_HEROKU}/books/${updateBook._id}`,
        updateBook
      );
    } catch (error) {
      console.error("error in the handleCreateBook function: ", error);
    }
  };

  render() {

    return (
      <Container>
        <Button
          id="bookbutton"
          style={{ marginLeft: "3.5rem" }}
          variant="primary"
          onClick={() => this.setState({ showForm: true })}
        >
          Add a New Book
        </Button>
        {this.state.showForm && (
          <BookFormModal
            handleCreateBook={this.handleCreateBook}
            closeModal={this.closeModal}
            showModal={this.showModal}
          />
        )}

        <Carousel className="carousel">
          {this.state.books.length ? (
            this.state.books.map((book) => (
              <Carousel.Item key={book._id}>
                <img
                  className="cad-block w-100"
                  src="/images/4.jpg"
                  alt="book1"
                  width={200}
                  height={400}
                />
                <Carousel.Caption>
                  <>
                    <h4>Title</h4>
                    <p>{book.title}</p>
                    <h4>Description </h4>
                    <p>{book.description}</p>
                    <h4>Status</h4>
                    <p>{book.status}</p>
                    <Button
                      variant="primary"
                      onClick={() => this.handleDeleteBook(book)}
                    >
                      Delete this book!
                    </Button>
                    <Button
                      id="updatebutton"
                      style={{ marginLeft: "4rem" }}
                      variant="primary"
                      onClick={() => this.setState({ updateForm: true })}
                    >
                      Edit a book entry
                    </Button>
                    {this.state.updateForm && (
                      <UpdateBookModal
                        book={book}
                        handleUpdateBook={this.handleUpdateBook}
                        closeUpdateModal={this.closeUpdateModal}
                        showUpdateModal={this.showUpdateModal}
                      />
                    )}
                  </>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : this.state.errorMessage ? (
            <h3>{this.state.errorMessage}</h3>
          ) : (
            <h3>No books found! </h3>
          )}
        </Carousel>
      </Container>
    );
  }
}

export default BestBooks;
