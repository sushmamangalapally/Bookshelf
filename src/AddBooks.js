
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class AddBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
    }

    state = {
        searchedBooks: [],
        query: '',
        noError: true
    };

    handleChange = (query) => {
        if(query){
            BooksAPI.search(query.trim())
            .then(bookResults => {
                // console.log(bookResults);
                bookResults = bookResults || [];
                if(!(bookResults.error) || bookResults.length > 0){
                    bookResults.forEach((resultBook) => {
                        resultBook.shelf = this.checkShelf(resultBook);
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
            })
        }else{
            this.setState({
                searchedBooks: [],
                query: query,
                noError: true
            })
        }
    }

    checkShelf = (result) => {
        let getBook = this.props.books.filter(book => book.id === result.id);
        return (getBook.length !== 0) ? getBook[0].shelf : "none";
    }

    updateShelf = (e, book) => {
        // console.log(e.target.value);
        console.log(book);

        this.props.changeShelf(e, book);
        
        book.shelf = e.target.value;
        
        this.setState({
            books: this.props.books.concat([book])
        })
    }

    showBooks = (searchedBooks) => {
        return (
            searchedBooks.map((book) => (
                <Book
                    key={book.id}
                    book={book}
                    books={this.props.books}
                    changeShelf={(e) => this.updateShelf(e, book)}
                    shelfType = {book.shelf}
                />
            ))
        )
    }

    render() {
        const {searchedBooks, query, noError, } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className='close-search'
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                            onChange= {(e) => this.handleChange(e.target.value)} 
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    {(noError) ?
                        <ol className="books-grid">
                            {this.showBooks(searchedBooks)}
                        </ol>
                    : (
                        <p>Your search "{query}" did not match any books in our listings</p>
                    )}
                </div>
            </div>
        )
    }
}

export default AddBooks;