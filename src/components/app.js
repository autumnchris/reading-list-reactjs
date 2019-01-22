import React, { Component } from 'react';
import MainContent from './main-content';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readingList: JSON.parse(localStorage.getItem('readingList')) || []
    };
    this.toggleRead = this.toggleRead.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  toggleRead(event, index) {
    let readingList = this.state.readingList;
    if (!event.target.matches('input[type=checkbox]')) return;
    readingList[index].read = !readingList[index].read;
    this.setState({ readingList });
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }

  deleteBook(index) {
    let readingList = this.state.readingList;

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingList.splice(index, 1);
      this.setState({ readingList });
      localStorage.setItem('readingList', JSON.stringify(readingList));
    }
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Build Your Reading List</h1>
        </header>
        <main>
          {/* ADD BOOK BUTTON */}
          <button type="button" className="add-book"><span className="fas fa-plus"></span> Add Book</button>
          {/* READING LIST */}
          <div className="main-card">
            <MainContent readingList={this.state.readingList} toggleRead={this.toggleRead} deleteBook={this.deleteBook} />
          </div>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
