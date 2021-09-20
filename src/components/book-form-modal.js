import React from 'react';

const BookFormModal = ({ titleValue, authorValue, pagesValue, readValue, bookFormError, errorMessage, readingList, handleChange, addNewBook, showModal }) => {

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Add New Book</div>
        <div className="modal-body">
          <form className="new-book-form" onSubmit={(event) => addNewBook(event, titleValue, authorValue, pagesValue, readValue, readingList)} noValidate>
            <div className="form-group">
              <label htmlFor="title-value">Title</label>
              <input type="text" className="title-value" name="titleValue" onChange={(event) => handleChange(event)} value={titleValue} id="title-value" />
            </div>
            <div className="form-group">
              <label htmlFor="author-value">Author</label>
              <input type="text" className="author-value" name="authorValue" onChange={(event) => handleChange(event)} value={authorValue} id="author-value" />
            </div>
            <div className="form-group">
              <label htmlFor="pages-value">Number of Pages</label>
              <input type="text" className="pages-value" name="pagesValue" onChange={(event) => handleChange(event)} value={pagesValue} id="pages-value" />
            </div>
            <div className="form-group">
              <label className="check-label" htmlFor="read-value">Read
                <input type="checkbox" name="readValue" onChange={(event) => handleChange(event)} tabIndex="-1" id="read-value" checked={readValue} />
                <span className="checkmark" tabIndex="0"></span>
              </label>
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Add" />
              <input type="button" className="button modal-button" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          {bookFormError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {errorMessage}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default BookFormModal;
