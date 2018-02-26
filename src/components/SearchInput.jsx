import React from 'react';
import PropTypes from 'prop-types';

/**
 * SearchInput component
 */
const SearchInput = ({ handleSearchInput }) => {
    return (
        <div className="search__input-container">
            <input
                className="search__input"
                type="text"
                onChange={e => handleSearchInput(e)}
                placeholder="Type your search query"
            />
        </div>
    )
};

/**
 * @type {Object}
 * @property {Function} handleSearchInput - function to handle item select
 *
 */
SearchInput.propTypes = {
    handleSearchInput: PropTypes.func,
};

export default SearchInput;