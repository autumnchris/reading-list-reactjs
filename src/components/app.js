import React, { Component } from 'react';
import MainContent from './main-content';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readingList: JSON.parse(localStorage.getItem('readingList')) || [],
      titleInput: '',
      authorInput: '',
      pagesInput: '',
      readInput: false,
      modalStyle: {display: 'none'},
      errorStyle: {display: 'none'}
    };
    this.toggleRead = this.toggleRead.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [event.target.name]: value
    });
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

  openModal() {
    this.setState({
      modalStyle: {display: 'block'}
    });
  }

  closeModal() {
    this.setState({
      modalStyle: {display: 'none'}
    });
  }

  componentDidMount() {
    window.addEventListener('click', (event) => {

      if (event.target.id === 'modal') {
        this.closeModal();
      }
    });
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
          <button type="button" className="add-book" onClick={() => this.openModal()}><span className="fas fa-plus"></span> Add Book</button>
          {/* ADD BOOK MODAL */}
          <div id="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Book</h2>
              </div>
              <div className="modal-body">
                <form className="new-book">
                  <div className="form-group">
                    <label htmlFor="title-input">Title:</label>
                    <input type="text" name="titleInput" onChange={(event) => this.handleChange(event)} value={this.state.titleInput} id="title-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author-input">Author:</label>
                    <input type="text" name="authorInput" onChange={(event) => this.handleChange(event)} value={this.state.authorInput} id="author-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pages-input">Number of Pages:</label>
                    <input type="text" name="pagesInput" onChange={(event) => this.handleChange(event)} value={this.state.pagesInput} id="pages-input" required />
                  </div>
                  <div className="form-group">
                    <label className="check-label" htmlFor="read-input">Read
                      <input type="checkbox" name="readInput" onChange={(event) => this.handleChange(event)} tabIndex="-1" id="read-input" checked={this.state.readInput} />
                      <span className="checkmark" tabIndex="0"></span>
                    </label>
                  </div>
                  <div className="button-group">
                    <input type="submit" value="Add" />
                    <input type="button" className="cancel" value="Cancel" onClick={() => this.closeModal()} />
                  </div>
                </form>
              </div>
            </div>
          </div>
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
