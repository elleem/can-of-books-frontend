import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: "",
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
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
      console.error("Error is in the componentDidMount Function: ", error.response);
      // axios sends more info about the error in a response object on the error
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  render() {
    /* TODO: render all the books in a Carousel */

    return (
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
    );
  }
}

export default BestBooks;
