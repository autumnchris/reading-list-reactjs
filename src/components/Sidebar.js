import React from 'react';
import getReadingList from '../utils/getReadingList';

const Sidebar = ({ setModalVisibility }) => {
  return (
    <div className="col sidebar">
      <div className="button-group">
        <button type="button" className="button add-book-button" onClick={() => setModalVisibility(true)}><span className="fas fa-plus" aria-hidden="true"></span> Add Book</button>
      </div>
      <div className="reading-list-stats">
        <div className="stat"><span className="stat-label">Books</span> {getReadingList().length}</div>
        <div className="stat"><span className="stat-label">Read</span> {getReadingList().filter(book => book.read).length}</div>
        <div className="stat"><span className="stat-label">Unread</span> {getReadingList().filter(book => !book.read).length}</div>
      </div>
    </div>
  );
}

export default Sidebar;