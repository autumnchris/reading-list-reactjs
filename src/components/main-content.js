import React from 'react';
import ReadingList from './reading-list';

const MainContent = ({ readingList, toggleRead, deleteBook }) => {

  if (readingList.length === 0) {
    return <p className="no-books">You currently have no books in your reading list. Click Add Book to get started.</p>;
  }
  else {
    return <ReadingList readingList={readingList} toggleRead={toggleRead} deleteBook={deleteBook} />;
  }
}

export default MainContent;
