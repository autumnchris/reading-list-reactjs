import React from 'react';
import Book from './book';

const ReadingList = ({ readingList, toggleRead }) => {

  const Books = readingList.sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  }).map((book, index) => {
    return <Book key={index} book={book} index={index} toggleRead={toggleRead} />;
  });

  return (
    <div className="reading-list">{Books}</div>
  );
}

export default ReadingList;
