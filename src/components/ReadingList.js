import React from 'react';
import FilterSortForm from './FilterSortForm';
import Book from './Book';
import InfoMessage from './InfoMessage';

const ReadingList = ({ readingList, viewableReadingList, filterSortFormData, setFilterSortFormData, deleteBook, toggleRead }) => {
  return (
    <React.Fragment>
      <FilterSortForm filterSortFormData={filterSortFormData} setFilterSortFormData={setFilterSortFormData} />
      {viewableReadingList.length !== 0 ? <div className="reading-list">{[...viewableReadingList].map((book) => <Book key={book.id} book={book} readingList={readingList} deleteBook={deleteBook} toggleRead={toggleRead} />)}</div> : <InfoMessage messageText="No results match your search specifications." />}
    </React.Fragment>
  );
}

export default ReadingList;
