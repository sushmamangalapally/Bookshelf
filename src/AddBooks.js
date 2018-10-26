
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI';
import Book from './Book';
class AddBooks extends Component {
    state = {
        searchedBooks: [],
        query: '',
        noError: true
    };

    handleChange = (query) => {
        let searchBooks = [];
        // e.preventDefault()
        // const values = serializeForm(e.target, { hash: true })
        console.log(query);
        if(query){
            BooksAPI.search(query.trim())
            .then(bookResults => {
                console.log("book results");
                console.log(bookResults)
                bookResults = bookResults || [];
                if(!(bookResults.error) || bookResults.length > 0){
                    bookResults.map((resultBook) => {
                        resultBook.shelf = "none";
                    })
                    this.setState({
                        searchedBooks: bookResults,
                        noError: true
                    })
                }else{
                    this.setState({
                        searchedBooks: [],
                        query: query,
                        noError: false
                    })
                }
                // searchBooks = bookResults.map((getBooks) => {
                //     console.log(getBooks);
                // })
            })
        }
        // BooksAPI.search(book)
        // .then((book) => {
        //     this.setState((currentState) => ({
        //         books: currentState.books.concat([book])
        //     }))
        // })
        // if (this.props.onAddBookToShelf) {
        //   this.props.onAddBookToShelf(query)
        // }
      }

    updateShelf = (e, book) => {
        console.log(e.target.value);
        
        this.props.changeShelf(e, book);
        
        book.shelf = e.target.value;
        console.log(book);
        this.setState({
            books: this.props.books.concat([book])
        })
        
    }

    render() {
        console.log(this.state.searchedBooks)
        const {searchedBooks, query, noError} = this.state;
        const { books, changeShelf, shelfTitle, shelfType } = this.props;

        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link
                className='close-search'
                to='/'>
                Close
                </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange= {(e) => this.handleChange(e.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
                {(noError) ?
                <ol className="books-grid">
                    
                    {searchedBooks.map((book) => (
                        <Book
                        key={book.id}
                        book={book}
                        books={books}
                        changeShelf={(e) => this.updateShelf(e, book)}
                        shelfType = {book.shelf}
                        />
                    ))}
                </ol>
                 : (
                     <p>Your search "{this.state.query}" did not match any books in our listings</p>
                 )}
            </div>
          </div>
        )
    }
}

export default AddBooks;