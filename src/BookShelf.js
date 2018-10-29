import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
        shelfTitle: PropTypes.string.isRequired,
        shelfType: PropTypes.string.isRequired
    }
    render() {
        const { books, changeShelf, shelfTitle, shelfType } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>(
                            <Book
                                key={book.id}
                                book={book}
                                books={books}
                                changeShelf={changeShelf}
                                shelfType = {shelfType}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;