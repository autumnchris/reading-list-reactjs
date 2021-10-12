import React, { useState, useEffect } from 'react';
import BookFormModal from './book-form-modal';
import ReadingList from './reading-list';
import bgImage from '.././images/background-image.jpg';

const App = () => {
  const initialBookFormData = {
    titleValue: '',
    authorValue: '',
    pagesValue: '',
    readValue: false
  };

  const [readingList, setReadingList] = useState(renderReadingList());
  const [modalVisibility, setModalVisibility] = useState(false);
  const [bookFormData, setBookFormData] = useState({ ...initialBookFormData });

  useEffect(() => {
    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });
  }, []);

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
    renderReadingList(currentReadingList);
    setBookFormData({ ...initialBookFormData });
  }

  function deleteBook(currentReadingList, index) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      currentReadingList.splice(index, 1);
      renderReadingList(currentReadingList);
    }
  }

  function toggleRead(event, currentReadingList, index) { 
    if (!event.target.matches('input[type=checkbox]')) return;
    currentReadingList[index].readValue = !currentReadingList[index].readValue;
    renderReadingList(currentReadingList);
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
            <button type="button" className="button add-book-button" onClick={() => setModalVisibility(true)}><span className="fas fa-plus"></span> Add Book</button>
          </div>
          <div className="col reading-list-content">
            <ReadingList readingList={[...readingList]} deleteBook={deleteBook} toggleRead={toggleRead} />
          </div>
        </div>
        {modalVisibility ? <BookFormModal setModalVisibility={setModalVisibility} bookFormData={{ ...bookFormData }} setBookFormData={setBookFormData} addNewBook={addNewBook} /> : null}
      </main>
      <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
