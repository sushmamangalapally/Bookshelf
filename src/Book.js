import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        // changeShelf: PropTypes.func.isRequired,
    }

    updateShelf = (e, book) => {
        this.props.changeShelf(e, book)
    }

    render() {
        const { book, books, changeShelf, shelfType } = this.props;
        return(
        <li key={book.id}>
        <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
            <select value={shelfType} onChange={(e) => this.updateShelf(e, book)}>
                <option value="move" disabled >Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{(book.authors ? (book.authors.length > 0 ? book.authors.join(', ') : book.authors[0]) : '')}</div>
        </div>
    </li>
        );
    }
}

export default Book;