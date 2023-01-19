import React, { useState, useEffect } from 'react';
import BookFormModal from './BookFormModal';
import ReadingList from './ReadingList';
import bgImage from '.././images/background-image.jpg';

const App = () => {
  const initialBookFormData = {
    titleValue: '',
    authorValue: '',
    pagesValue: '',
    readValue: false
  };
  const initialSortFormData = {
    sortValue: 'title'
  };

  const [readingList, setReadingList] = useState(renderReadingList());
  const [viewableReadingList, setViewableReadingList] = useState([...readingList]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [bookFormData, setBookFormData] = useState({ ...initialBookFormData });
  const [sortFormData, setSortFormData] = useState({ ...initialSortFormData });

  useEffect(() => {
    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });
  }, []);

  useEffect(() => {
    modalVisibility ? document.querySelector('body').classList.add('modal-open') : document.querySelector('body').classList.remove('modal-open');
  }, [modalVisibility]);

  useEffect(() => {
    updateViewableReadingList([...viewableReadingList]);
  }, [sortFormData.sortValue]);

  function renderReadingList(currentReadingList) {
    if (currentReadingList) {
      setReadingList(currentReadingList);
      localStorage.setItem('readingList', JSON.stringify(currentReadingList));
    }
    return JSON.parse(localStorage.getItem('readingList')) || [];
  }

  function addNewBook(newBook) {
    const currentReadingList = [...readingList];
    currentReadingList.push(newBook);
    updateViewableReadingList(currentReadingList);
    renderReadingList(currentReadingList);
    setBookFormData({ ...initialBookFormData });
  }

  function deleteBook(currentReadingList, bookID) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      currentReadingList = currentReadingList.filter(book => book.id !== bookID);
      updateViewableReadingList(currentReadingList);
      renderReadingList(currentReadingList);
    }
  }

  function toggleRead(event, currentReadingList, bookID) { 
    let checkboxValue = document.getElementById(`read-${bookID}`).checked;
    if (event.type === 'click' && !event.target.matches('input[type=checkbox]')) return;

    if (event.keyCode === 13) {
      event.preventDefault();
      checkboxValue = !checkboxValue;
    }

    if (event.keyCode === 13 || event.type === 'change') {
      currentReadingList = currentReadingList.map(book => {
        if (book.id === bookID) book.readValue = !book.readValue;
        return book;
      });
      updateViewableReadingList(currentReadingList);
      renderReadingList(currentReadingList);
    }
  }

  function updateViewableReadingList(currentViewableReadingList) {
    currentViewableReadingList = sortBooks(sortFormData.sortValue, currentViewableReadingList);
    setViewableReadingList(currentViewableReadingList);
  }

  function sortBooks(value, currentViewableReadingList) {

    currentViewableReadingList = currentViewableReadingList.sort((a, b) => {
      const authorNameA = a.authorValue.toLowerCase().split(' ');
      const authorNameB = b.authorValue.toLowerCase().split(' ');
      const lastNameA = authorNameA[authorNameA.length - 1];
      const lastNameB = authorNameB[authorNameB.length - 1];
      const firstNameA = authorNameA[0];
      const firstNameB = authorNameB[0];

      switch(value) {
        case 'title':
          return a.titleValue.toLowerCase().localeCompare(b.titleValue.toLowerCase());
          break;
        case 'first-name':      
          if (lastNameA === lastNameB && firstNameA === firstNameB && authorNameA.length > authorNameB.length) {
            return authorNameB.join(' ').localeCompare(authorNameA.join(' '));
          }
          else {
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
          break;
        case 'last-name':
          if (lastNameA === lastNameB) {
            authorNameA.pop();
            authorNameB.pop();
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
          else {
            return lastNameA.localeCompare(lastNameB);
          }
          break;
        case 'pages-least':
          return a.pagesValue - b.pagesValue;
          break;
        case 'pages-greatest':
          return b.pagesValue - a.pagesValue;
          break;
      }
    });
    return currentViewableReadingList;
  }

  return (
    <React.Fragment>
      <header>
        <div className="bg-image" style={{backgroundImage: `url(${bgImage})`}}></div>
        <h1>Build Your Reading List</h1>
      </header>
      <main>
        <div className="reading-list-container">
          <div className="col sidebar">
            <button type="button" className="button add-book-button" onClick={() => setModalVisibility(true)}><span className="fas fa-plus" aria-hidden="true"></span> Add Book</button>
          </div>
          <div className="col reading-list-content">
            {readingList.length !== 0 ? <ReadingList readingList={readingList} viewableReadingList={viewableReadingList} sortFormData={{ ...sortFormData }} setSortFormData={setSortFormData} deleteBook={deleteBook} toggleRead={toggleRead} /> : <p className="message info-message"><span className="fa fa-info-circle fa-lg fa-fw" aria-hidden="true"></span> You currently have no books in your reading list. Click the Add Book button to get started.</p>}
          </div>
        </div>
        {modalVisibility ? <BookFormModal setModalVisibility={setModalVisibility} bookFormData={{ ...bookFormData }} setBookFormData={setBookFormData} addNewBook={addNewBook} /> : null}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
