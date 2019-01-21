import React, { Component } from 'react';
import ReadingList from './reading-list';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readingList: JSON.parse(localStorage.getItem('readingList')) || []
    };
    this.toggleRead = this.toggleRead.bind(this);
  }

  toggleRead(event, index) {
    let readingList = this.state.readingList;
    if (!event.target.matches('input[type=checkbox]')) return;
    readingList[index].read = !readingList[index].read;
    this.setState({ readingList });
    localStorage.setItem('readingList', JSON.stringify(readingList));
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
          <div className="main-card">
            {/* READING LIST */}
            <ReadingList readingList={this.state.readingList} toggleRead={this.toggleRead} />
          </div>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
