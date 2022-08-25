import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import BookFormModal from "./BookFormModal";



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: "",
      showForm: false
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    try {
      const config = {
        method: "get", // get is default behavior
        baseURL: process.env.REACT_APP_SERVER,
        url: "/books",
      };

      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: response.data });
    } catch (error) {
      console.error("Error is in the componentDidMount Function: ", error.response);
      // axios sends more info about the error in a response object on the error
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  handleCreateBook = async (createBook) =>{
    try{
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        data: createBook
      };
      const response = await axios(config);
      console.log(response.data);
      this.setState({ books: [...this.state.books, response.data] });
      console.log(this.state.books); 
    } catch(error){
      console.error ('error in the handleCreateBook function: ', error); 
      this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}`});
    }
  }
  
  closeModal = () => {
    this.setState({showForm: false}); 
  }

  showModal = () => {
    this.setState({showForm: true}); 
  }
  
  handleDeleteBook = async (bookToBeDeleted) => {
    try {

      const proceed = window.confirm(`Do you wish to delete ${bookToBeDeleted.title}?`)

      if (proceed) {
        const config = {
          method: 'delete', 
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${bookToBeDeleted._id}?queryParam=value`
        };
        
        const response = await axios(config);
        console.log(response.data);
        const newBooksArray = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
        this.setState({ books: newBooksArray });
      }
    } catch(error) {
      console.error('Error is in the App.js in the deleteBook Function: ', error);
      // axios sends more info about the error in a response object on the error
      this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}`});
    }
  }

  render() {
    /* TODO: render all the books in a Carousel */

    return (
      <Container>
      <button onClick={() => this.setState({ showForm: true })}>Add a New Book</button>
      {this.state.showForm && <BookFormModal 
      handleCreateBook={this.handleCreateBook} 
      closeModal={this.closeModal}
      showModal={this.showModal}
      />}
      <Carousel>
        
        {this.state.books.length ? (
          this.state.books.map((book) => (
            <Carousel.Item key={book._id}>
              <img
                className="cad-block w-100"
                src="/images/1.jpg"
                alt="book1"
                width={500} height={500}
              />
              <Carousel.Caption>
                <>
                  <p>title {book.title}</p>
                  <p>description {book.description}</p>
                  <p>status {book.status}</p>
                  <button onClick={() => this.handleDeleteBook(book)}>Delete this book!</button>
                </>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          this.state.errorMessage ? 
          <h3>{this.state.errorMessage}</h3>
          :
          <h3>No books found! </h3>
        )}
      </Carousel>
      </Container>
    );
  }
}

export default BestBooks;
