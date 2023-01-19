import React from 'react';

const SortForm = ({ sortFormData, setSortFormData }) => {

  function handleChange(event) {
    setSortFormData(prevSortFormData => {
      return {
        ...prevSortFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  return (
    <form className="sort-form" onSubmit={(event) => { event.preventDefault(); }}>
      <div className="form-group">
        <label htmlFor="sort-value">Order by</label>
        <div className="select-wrapper">
          <select name="sortValue" onChange={(event) => handleChange(event)} value={sortFormData.sortValue} id="sort-value">
            <option value="title">Title</option>
            <option value="first-name">Author: First Name</option>
            <option value="last-name">Author: Last Name</option>
            <option value="pages-least">Pages: Least to Greatest</option>
            <option value="pages-greatest">Pages: Greatest to Least</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default SortForm;