import React from 'react';
import Book from './book';

const ReadingList = ({ readingList }) => {

  const Books = readingList.sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  }).map((book, index) => {
    return <Book key={index} book={book} index={index} />;
  });

  return (
    <div className="reading-list">{Books}</div>
  );
}

export default ReadingList;
