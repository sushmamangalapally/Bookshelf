import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import AddBooks from './AddBooks';
import { Route } from 'react-router-dom';

class BooksApp extends Component {
    state = {
        showSearchPage: false,
        books: [],
    }

    componentDidMount(){ //is invoked immediately after a component is mounted
        BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
                books
            }))
        })
    }

    changeShelf = (e, book) => {
        const getBook = this.state.books.find(b => b.id === book.id);
        let newShelf = e.target.value;
        if(getBook){
            this.setState((currentState) => ({
                books: currentState.books.map((getBook) => {
                    if(getBook.id === book.id){
                        getBook.shelf = newShelf;
                        BooksAPI.update(book, newShelf)
                        .then(
                            currentState.books.filter(book => book.id !== getBook.id).concat([getBook])
                        )            
                    }
                    return getBook;
                })
            }))
        }else{
            book.shelf = newShelf;
            BooksAPI.update(book, newShelf)
            .then(
                this.setState((prevState) => ({
                    books: prevState.books.concat([book])
                }))
            )
        }
        // console.log(e.target.value)
        // console.log(book);
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        books = {this.state.books}
                        changeShelf = {this.changeShelf}
                    />
                )}/>
                <Route path='/search' render={({ history }) => (
                    <AddBooks
                        changeShelf = {this.changeShelf}
                        books = {this.state.books}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
