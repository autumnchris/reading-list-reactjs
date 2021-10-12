import React, { useState } from 'react';

const BookFormModal = ({ setModalVisibility, bookFormData, setBookFormData, addNewBook }) => {
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

  function handleSubmit(event) {
    event.preventDefault();

    if (!bookFormData.titleValue.trim()) {
      setBookFormErrorMessage('A book title is required to add a new book.');
    }
    else if (!bookFormData.authorValue.trim()) {
      setBookFormErrorMessage('An author is required to add a new book.');
    }
    else if (!bookFormData.pagesValue.trim()) {
      setBookFormErrorMessage('The number of pages is required to add a new book.');
    }
    else if (isNaN(bookFormData.pagesValue) || bookFormData.pagesValue <= 0) {
      setBookFormErrorMessage('The number of pages must be a number greater than 0.');
    }
    else {
      addNewBook(bookFormData);
      setModalVisibility(false);
    }
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Add New Book</div>
        <div className="modal-body">
          <form className="new-book-form" onSubmit={(event) => handleSubmit(event)} noValidate>
            <div className="form-group">
              <label htmlFor="title-value">Title</label>
              <input type="text" className="title-value" name="titleValue" onChange={(event) => handleChange(event)} value={bookFormData.titleValue} id="title-value" />
            </div>
            <div className="form-group">
              <label htmlFor="author-value">Author</label>
              <input type="text" className="author-value" name="authorValue" onChange={(event) => handleChange(event)} value={bookFormData.authorValue} id="author-value" />
            </div>
            <div className="form-group">
              <label htmlFor="pages-value">Number of Pages</label>
              <input type="text" className="pages-value" name="pagesValue" onChange={(event) => handleChange(event)} value={bookFormData.pagesValue} id="pages-value" />
            </div>
            <div className="form-group">
              <label className="check-label" htmlFor="read-value">Read
                <input type="checkbox" name="readValue" onChange={(event) => handleChange(event)} tabIndex="-1" id="read-value" checked={bookFormData.readValue} />
                <span className="checkmark" tabIndex="0"></span>
              </label>
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Add" />
              <input type="button" className="button modal-button" onClick={() => setModalVisibility(false)} value="Cancel" />
            </div>
          </form>
          {bookFormErrorMessage ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {bookFormErrorMessage}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default BookFormModal;
