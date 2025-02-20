import React from 'react';
import getReadingList from '../utils/getReadingList';

const Book = ({ book, deleteBook, toggleRead, toggleFormModal }) => {
  const editBookFormData = {
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.read,
    id: book.id
  };

  return (
    <div className="book-card">
      <div className="row">
        <div className="title">{book.title}</div>
        <div className="button-group">
          <button type="button" className="button edit-book-button" onClick={() => toggleFormModal(true, 'edit', editBookFormData)} aria-label={`edit book ${book.title} by ${book.author}`} title="Edit">
            <span className="fa-solid fa-pencil fa-sm fa-fw icon"></span>
          </button>
          <button type="button" className="button delete-book-button" onClick={() => deleteBook(getReadingList(), book.id)} aria-label={`delete book ${book.title} by ${book.author}`} title="Delete">
            <span className="fa-solid fa-trash fa-sm fa-fw icon"></span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="book-info author"><span className="book-info-label">by</span> {book.author}</div>
        <div className="book-info pages"><span className="book-info-label">Pages</span> {book.pages}</div>
        <form noValidate>
          <div className="form-group">
            <label className="check-label" htmlFor={`read-${book.id}`}>Read
              <input type="checkbox" name="readValue" onChange={(event) => toggleRead(event, getReadingList(), book.id)} tabIndex="-1" id={`read-${book.id}`} autoComplete="off" checked={book.read} />
              <span className="checkmark" tabIndex="0" onKeyDown={(event) => toggleRead(event, getReadingList(), book.id)}></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Book;
