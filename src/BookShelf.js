import React, { Component } from 'react'
import AddBooks from './AddBooks';
import ListBooks from './ListBooks';
import Book from './Book';

class BookShelf extends React.Component {
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
            </div>        )
    }
}

export default BookShelf;