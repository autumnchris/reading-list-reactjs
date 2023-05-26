import React, { useState, useEffect } from 'react';
import FilterSortForm from './FilterSortForm';
import Book from './Book';
import InfoMessage from './InfoMessage';

const ReadingList = ({ readingList, deleteBook, toggleRead, toggleFormModal }) => {
  const initialFilterSortFormData = {
    searchValue: '',
    filterReadValue: 'all',
    sortValue: 'title'
  };

  const [viewableReadingList, setViewableReadingList] = useState([...readingList]);
  const [filterSortFormData, setFilterSortFormData] = useState({ ...initialFilterSortFormData });

  useEffect(() => {
    updateViewableReadingList([...viewableReadingList]);
  }, [filterSortFormData, readingList]);

  function updateViewableReadingList(viewableReadingListData) {
    viewableReadingListData = searchReadingList(filterSortFormData.searchValue, viewableReadingListData);
    viewableReadingListData = filterByReadStatus(filterSortFormData.filterReadValue, viewableReadingListData);
    viewableReadingListData = sortBooks(filterSortFormData.sortValue, viewableReadingListData);
    setViewableReadingList(viewableReadingListData);
  }

  function searchReadingList(value, viewableReadingListData) {
    value = value.toLowerCase();

    if (value) {
      viewableReadingListData = [...readingList].filter(book => book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value));
    }
    else {
      viewableReadingListData = [...readingList];
    }
    return viewableReadingListData;
  }

  function filterByReadStatus(value, viewableReadingListData) {
    viewableReadingListData = viewableReadingListData.filter(book => {

      if (value === 'read') {
        return book.read;
      }
      else if (value === 'unread') {
        return !book.read;
      }
      else {
        return book;
      }
    });
    return viewableReadingListData;
  }

  function sortBooks(value, viewableReadingListData) {

    viewableReadingListData = viewableReadingListData.sort((a, b) => {
      const authorNameA = a.author.toLowerCase().split(' ');
      const authorNameB = b.author.toLowerCase().split(' ');
      const lastNameA = authorNameA[authorNameA.length - 1];
      const lastNameB = authorNameB[authorNameB.length - 1];
      const firstNameA = authorNameA[0];
      const firstNameB = authorNameB[0];

      switch(value) {
        case 'title':
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        case 'first-name':      
          if (lastNameA === lastNameB && firstNameA === firstNameB && authorNameA.length > authorNameB.length) {
            return authorNameB.join(' ').localeCompare(authorNameA.join(' '));
          }
          else {
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
        case 'last-name':
          if (lastNameA === lastNameB) {
            authorNameA.pop();
            authorNameB.pop();
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
          else {
            return lastNameA.localeCompare(lastNameB);
          }
        case 'pages-least':
          return a.pages - b.pages;
        case 'pages-greatest':
          return b.pages - a.pages;
      }
    });
    return viewableReadingListData;
  }

  return (
    <React.Fragment>
      <FilterSortForm filterSortFormData={filterSortFormData} setFilterSortFormData={setFilterSortFormData} />
      {viewableReadingList.length !== 0 ? <div className="reading-list">{[...viewableReadingList].map(book => <Book key={book.id} book={book} deleteBook={deleteBook} toggleRead={toggleRead} toggleFormModal={toggleFormModal} />)}</div> : <InfoMessage messageText="No results match your search specifications." />}
    </React.Fragment>
  );
}

export default ReadingList;
