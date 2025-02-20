import React from 'react';

const FilterSortForm = ({ filterSortFormData, setFilterSortFormData }) => {

  function handleChange(event) {
    setFilterSortFormData(prevFilterSortFormData => {
      return {
        ...prevFilterSortFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  return (
    <form className="filter-sort-form" onSubmit={(event) => { event.preventDefault(); }} noValidate>
      <div className="row row-search">
        <div className="form-group">
          <label htmlFor="search-value">Filter by Keyword</label>
          <input type="text" name="searchValue" onChange={(event) => handleChange(event)} value={filterSortFormData.searchValue} placeholder="Find a book..." id="search-value" autoComplete="off" />
        </div>
      </div>
      <div className="row row-select">
        <div className="form-group">
          <label htmlFor="filter-read-value">Filter by Read Status</label>
          <div className="select-wrapper">
            <select name="filterReadValue" onChange={(event) => handleChange(event)} value={filterSortFormData.filterReadValue} id="filter-read-value" autoComplete="off">
              <option value="all">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="sort-value">Order by</label>
          <div className="select-wrapper">
            <select name="sortValue" onChange={(event) => handleChange(event)} value={filterSortFormData.sortValue} id="sort-value" autoComplete="off">
              <option value="title">Title</option>
              <option value="first-name">Author: First Name</option>
              <option value="last-name">Author: Last Name</option>
              <option value="pages-least">Pages: Least to Greatest</option>
              <option value="pages-greatest">Pages: Greatest to Least</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FilterSortForm;