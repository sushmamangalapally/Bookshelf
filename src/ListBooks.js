import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
    }
    render() {
        const { books, changeShelf } = this.props;
        const shelfTypes = [
            {"type": "currentlyReading", "title": "Currently Reading"},
            {"type": "read", "title": "Read"},
            {"type": "wantToRead", "title": "Want To Read"},
        ];

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelfTypes.map((shelf, index) => {
                            const shelfTypeBooksList = books.filter( book => book.shelf === shelf.type);
                            return (
                                <BookShelf
                                    key={shelf.type}
                                    shelfTitle={shelf.title}
                                    shelfType={shelf.type}
                                    books = {shelfTypeBooksList}
                                    changeShelf = {changeShelf}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className='book' >Add Book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;