import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ReadingList from './components/ReadingList';
import BookFormModal from './components/BookFormModal';
import InfoMessage from './components/InfoMessage';
import getReadingList from './utils/getReadingList';

const App = () => {
  const initialBookFormData = {
    title: '',
    author: '',
    pages: '',
    read: false
  };

  const [readingList, setReadingList] = useState([...getReadingList()]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [bookFormData, setBookFormData] = useState({ ...initialBookFormData });

  useEffect(() => {
    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });

    window.addEventListener('keydown', event => {
      if (modalVisibility && event.key === 'Escape') setModalVisibility(false);
    });
  }, [modalVisibility]);

  useEffect(() => {
    modalVisibility ? document.querySelector('body').classList.add('modal-open') : document.querySelector('body').classList.remove('modal-open');
  }, [modalVisibility]);

  function addNewBook(newBook) {
    const readingListData = [...readingList];
    readingListData.push(newBook);
    setReadingList(readingListData);
    getReadingList(readingListData);
    setBookFormData({ ...initialBookFormData });
  }

  function deleteBook(readingListData, bookID) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingListData = readingListData.filter(book => book.id !== bookID);
      setReadingList(readingListData);
      getReadingList(readingListData);
    }
  }

  function toggleRead(event, readingListData, bookID) { 
    let checkboxValue = document.getElementById(`read-${bookID}`).checked;
    if (event.type === 'click' && !event.target.matches('input[type=checkbox]')) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      checkboxValue = !checkboxValue;
    }

    if (event.key === 'Enter' || event.type === 'change') {
      readingListData = readingListData.map(book => {
        if (book.id === bookID) book.read = !book.read;
        return book;
      });
      setReadingList(readingListData);
      getReadingList(readingListData);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="reading-list-container">
          <Sidebar setModalVisibility={setModalVisibility} />
          <div className="col reading-list-content">
            {readingList.length !== 0 ? <ReadingList readingList={readingList} deleteBook={deleteBook} toggleRead={toggleRead} /> : <InfoMessage messageText="You currently have no books in your reading list. Click the Add Book button to get started." />}
          </div>
        </div>
        {modalVisibility ? <BookFormModal setModalVisibility={setModalVisibility} bookFormData={bookFormData} setBookFormData={setBookFormData} addNewBook={addNewBook} /> : null}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;