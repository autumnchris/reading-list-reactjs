import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import getReadingList from '../utils/getReadingList';

const BookFormModal = ({ bookFormType, bookFormData, setBookFormData, toggleFormModal, editBook, addNewBook }) => {
  const [bookFormErrorMessage, setBookFormErrorMessage] = useState('');

  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBookFormData(prevBookFormData => {
      return {
        ...prevBookFormData,
        [event.target.name]: value
      };
    });
  }

  function handleKeyDown(event, id) {
    let checkboxValue = document.getElementById(id).checked;
    
    if (event.key === 'Enter') {
      event.preventDefault();
      checkboxValue = !checkboxValue;
      setBookFormData(prevBookFormData => {
        return {
          ...prevBookFormData,
          'read': checkboxValue
        };
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newBook = {
      title: bookFormData.title.trim(),
      author: bookFormData.author.trim(),
      pages: bookFormData.pages.trim(),
      read: bookFormData.read,
      id: Date.now()
    };

    if (!newBook.title) {
      setBookFormErrorMessage('A book title is required to add a new book.');
    }
    else if (!newBook.author) {
      setBookFormErrorMessage('An author is required to add a new book.');
    }
    else if (!newBook.pages) {
      setBookFormErrorMessage('The number of pages is required to add a new book.');
    }
    else if (isNaN(newBook.pages) || newBook.pages <= 0) {
      setBookFormErrorMessage('The number of pages must be a number greater than 0.');
    }
    else {

      if (bookFormType === 'edit') {
        editBook(bookFormData, getReadingList(), bookFormData.id);
      }
      else if ('add') {
        addNewBook(newBook);
      }
      toggleFormModal(false);
    }
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">{bookFormType === 'edit' ? 'Edit Book' : 'Add New Book'}</div>
        <div className="modal-body">
          <form className="new-book-form" onSubmit={(event) => handleSubmit(event)} noValidate>
            <div className="form-group">
              <label htmlFor="title-value">Title</label>
              <input type="text" className="title-value" name="title" onChange={(event) => handleChange(event)} value={bookFormData.title} id="title-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="author-value">Author</label>
              <input type="text" className="author-value" name="author" onChange={(event) => handleChange(event)} value={bookFormData.author} id="author-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="pages-value">Number of Pages</label>
              <input type="text" className="pages-value" name="pages" inputMode="numeric" onChange={(event) => handleChange(event)} value={bookFormData.pages} id="pages-value" required />
            </div>
            <div className="form-group">
              <label className="check-label" htmlFor="read-value">Read
                <input type="checkbox" name="read" onChange={(event) => handleChange(event)} tabIndex="-1" id="read-value" checked={bookFormData.read} />
                <span className="checkmark" tabIndex="0" onKeyDown={(event) => handleKeyDown(event, 'read-value')}></span>
              </label>
            </div>
            <div className="button-group">
              <button type="submit" className="button modal-button">Save</button>
              <button type="button" className="button modal-button" onClick={() => toggleFormModal(false)}>Cancel</button>
            </div>
          </form>
          {bookFormErrorMessage && <ErrorMessage messageText={bookFormErrorMessage} />}
        </div>
      </div>
    </div>
  );
}

export default BookFormModal;
