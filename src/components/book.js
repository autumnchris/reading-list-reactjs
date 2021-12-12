import React from 'react';

const Book = ({ book, index, readingList, deleteBook, toggleRead }) => {

  return (
    <div className="book-card">
      <div className="row">
        <div className="title">{book.titleValue}</div>
        <button type="button" className="button delete-book-button" onClick={() => deleteBook(readingList, index)} aria-label="delete book" title="Delete">
          <span className="fa fa-trash-alt fa-sm delete-icon"></span>
        </button>
      </div>
      <div className="row">
        <div className="book-info author"><span className="book-info-label">by</span> {book.authorValue}</div>
        <div className="book-info pages"><span className="book-info-label">Pages</span> {book.pagesValue}</div>
        <form noValidate>
          <div className="form-group">
            <label className="check-label" htmlFor={`read-${index}`}>Read
              <input type="checkbox" name="readValue" onChange={(event) => toggleRead(event, readingList, index)} tabIndex="-1" id={`read-${index}`} checked={book.readValue} />
              <span className="checkmark" tabIndex="0" onKeyDown={(event) => toggleRead(event, readingList, index)}></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Book;
