import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import BookFormModal from "./BookFormModal";
import Button from "react-bootstrap/Button";
import UpdateBookModal from "./UpdateBookModal";
import {withAuth0} from '@auth0/auth0-react'; 

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
  

  componentDidMount = async() => {
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims(); 
      const jwt = res.__raw; 

      console.log('token: ', jwt); 
  
      const config = {
        headers: {"Authorization": `Bearer ${jwt}`},
        method: 'get', 
        baseURL: process.env.REACT_APP_HEROKU,
        url: '/books'
      }
    try{
      const booksResponse = await axios(config); 
      
      console.log("Books from DB: ", booksResponse.data); 
      this.setState({books: booksResponse.data}); 
    } catch (error) {
      console.error(
        "Error is in the componentDidMount Function: ",
        error.response
      );
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  }
}

  handleCreateBook = async (createBook) => {
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims(); 
      const jwt = res.__raw; 
  
  
      console.log('token: ', jwt); 
  
      const config = {
        headers: {"Authorization": `Bearer ${jwt}`},
        method: 'post', 
        baseURL: process.env.REACT_APP_HEROKU,
        url: '/books',
        data: createBook,
      }
    try {
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
        `Do you wish to delete ${bookToBeDeleted.title}?`)
      if (proceed && this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
  
        // leave this console here in order to grab your token for backend testing in Thunder Client
        console.log('token: ', jwt);

        const config = {
          headers: {"Authorization": `Bearer ${jwt}`},
          method: "delete",
          baseURL: process.env.REACT_APP_HEROKU,
          url: `/books/${bookToBeDeleted._id}`,
        };
        const newBooksArray = this.state.books.filter(
          (book) => book._id !== bookToBeDeleted._id
        );
        this.setState({ books: newBooksArray });
        await axios(config);
      }} catch (error) {
      console.error(
        "Error is in the App.js in the deleteBook Function: ",
        error
      );
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  handleUpdateBook = async (updatedBook) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      console.log('token: ', jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: "put",
        baseURL: process.env.REACT_APP_HEROKU,
        url: `/books/${updatedBook._id}`,
        data: updatedBook
      };

      const updateBook =await axios(config); 
    try {
      const updatedBooks = this.state.books.map((existingBook) => {
        if (existingBook._id === updateBook._id) {
          return updateBook;
        } else {
          return existingBook;
        }
      });
      this.setState({
        books: updatedBooks,
      });
      console.log("updatedbook", updatedBooks); 
      console.log("books variable", updateBook); 
    } catch (error) {
      console.error("error in the handleCreateBook function: ", error);
    }
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
                  {this.state.updateForm && (
                      <UpdateBookModal
                        book={this.state.book}
                        handleUpdateBook={this.handleUpdateBook}
                        closeUpdateModal={this.closeUpdateModal}
                        showUpdateModal={this.showUpdateModal}
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
                      onClick={() => this.setState({ updateForm: true, book: book})}
                    >
                      Edit a book entry
                    </Button>
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


export default withAuth0(BestBooks);
