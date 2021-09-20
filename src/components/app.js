import React from 'react';
import BookFormModal from './book-form-modal';
import ReadingList from './reading-list';
import bgImage from '.././images/background-image.jpg';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      authorValue: '',
      pagesValue: '',
      readValue: false,
      readingList: this.renderReadingList(),
      isModalOpen: false,
      bookFormError: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  renderReadingList(readingList) {

    if (readingList) {
      this.setState({ readingList });
      localStorage.setItem('readingList', JSON.stringify(readingList));
    }
    return JSON.parse(localStorage.getItem('readingList')) || [];
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  addNewBook(event, titleValue, authorValue, pagesValue, readValue, readingList) {
    event.preventDefault();

    if (!titleValue.trim()) {
      this.setState({
        bookFormError: true,
        errorMessage: 'A book title is required to add a new book.'
      });
    }
    else if (!authorValue.trim()) {
      this.setState({
        bookFormError: true,
        errorMessage: 'An author is required to add a new book.'
      });
    }
    else if (!pagesValue.trim()) {
      this.setState({
        bookFormError: true,
        errorMessage: 'The number of pages is required to add a new book.'
      });
    }
    else if (isNaN(pagesValue) || pagesValue < 0) {
      this.setState({
        bookFormError: true,
        errorMessage: 'The number of pages must be a number greater than 0.'
      });
    }
    else {
      readingList.push({
        titleValue,
        authorValue,
        pagesValue,
        readValue
      });
      this.renderReadingList(readingList);
      this.showModal(false);
      this.setState({
        titleValue: '',
        authorValue: '',
        pagesValue: '',
        readValue: false,
      });
    }
  }

  deleteBook(readingList, index) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingList.splice(index, 1);
      this.renderReadingList(readingList);
    }
  }

  toggleRead(event, readingList, index) {

    if (!event.target.matches('input[type=checkbox]')) return;
    readingList[index].readValue = !readingList[index].readValue;
    this.renderReadingList(readingList);
  }

  showModal(status) {
    this.setState({
      isModalOpen: status,
      bookFormError: false
    });
  }

  componentDidMount() {
    window.addEventListener('click', event => {

      if (event.target.id === 'modal') {
        this.showModal(false);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="bg-image" style={{backgroundImage: `url(${bgImage})`}}></div>
          <h1>Build Your Reading List</h1>
        </header>
        <main>
          <div className="reading-list-container">
            <div className="col sidebar">
              <button type="button" className="button add-book-button" onClick={() => this.showModal(true)}><span className="fas fa-plus"></span> Add Book</button>
            </div>
            <div className="col reading-list-content">
              <ReadingList readingList={this.state.readingList} deleteBook={this.deleteBook} toggleRead={this.toggleRead} />
            </div>
          </div>
          {this.state.isModalOpen ? <BookFormModal titleValue={this.state.titleValue} authorValue={this.state.authorValue} pagesValue={this.state.pagesValue} readValue={this.state.readValue} bookFormError={this.state.bookFormError} errorMessage={this.state.errorMessage} readingList={this.state.readingList} handleChange={this.handleChange} addNewBook={this.addNewBook} showModal={this.showModal} /> : null}
        </main>
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </React.Fragment>
    );
  }
}

export default App;
