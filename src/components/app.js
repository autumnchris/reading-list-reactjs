import React, { Component } from 'react';
import ReadingList from './reading-list';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readingList: JSON.parse(localStorage.getItem('readingList')) || []
    };
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
            <ReadingList readingList={this.state.readingList} />
          </div>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
