import React from 'react';
import Book from './Book';

const ReadingList = ({ readingList, deleteBook, toggleRead }) => {
  return <React.Fragment>{readingList.sort((a, b) => a.titleValue.toLowerCase().localeCompare(b.titleValue.toLowerCase())).map((book, index) => <Book key={index} book={book} index={index} readingList={readingList} deleteBook={deleteBook} toggleRead={toggleRead} />)}</React.Fragment>;
}

export default ReadingList;
