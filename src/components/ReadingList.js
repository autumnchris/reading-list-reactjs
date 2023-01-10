import React from 'react';
import Book from './Book';

const ReadingList = ({ readingList, deleteBook, toggleRead }) => {

  if (readingList.length === 0) {
    return <p className="message info-message"><span className="fa fa-info-circle fa-lg fa-fw"></span> You currently have no books in your reading list. Click the Add Book button to get started.</p>;
  }
  else {
    return <React.Fragment>{readingList.sort((a, b) => a.titleValue.toLowerCase().localeCompare(b.titleValue.toLowerCase())).map((book, index) => <Book key={index} book={book} index={index} readingList={readingList} deleteBook={deleteBook} toggleRead={toggleRead} />)}</React.Fragment>;
  }
}

export default ReadingList;
