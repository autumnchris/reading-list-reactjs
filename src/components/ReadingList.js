import React from 'react';
import SortForm from './SortForm';
import Book from './Book';

const ReadingList = ({ readingList, viewableReadingList, sortFormData, setSortFormData, deleteBook, toggleRead }) => {
  return (
    <React.Fragment>
      <SortForm sortFormData={sortFormData} setSortFormData={setSortFormData} />
      {[...viewableReadingList].map((book) => <Book key={book.id} book={book} readingList={readingList} deleteBook={deleteBook} toggleRead={toggleRead} />)}
    </React.Fragment>
  );
}

export default ReadingList;
