import React from 'react';

const Book = ({ book, index, toggleRead }) => {

  return (
    <div className="book-card">
      <div className="row">
        <h2>
          <cite>{book.title}</cite>
        </h2>
        <button type="button" className="delete-book" aria-label="delete book" title="Delete">
          <span className="fa fa-trash-alt"></span>
        </button>
      </div>
      <div className="row">
        <hr />
        <div className="author">by {book.author}</div>
        <div className="pages">Pages: {book.pages}</div>
        <form>
          <label className="check-label" htmlFor={`read-${index}`}>Read
            <input type="checkbox" name="read-input" tabIndex="-1" id={`read-${index}`} onChange={(event) => toggleRead(event, index)} checked={book.read} />
            <span className="checkmark" tabIndex="0"></span>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Book;
