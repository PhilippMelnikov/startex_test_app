import React from 'react';
import PropTypes from 'prop-types';

/**
 * PaginationItem component
 */
const PaginationItem = ({ page, active, handlePaginationClick }) => {
    return (
        active ? (
            <li>
                <span className="active">
                    {page}
                </span>
            </li>
        ) : (
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePaginationClick(page);
                        }}
                    >
                        {page}
                    </a>
                </li>
            )
    )
}

/**
 * @type {Object}
 * @property {Number} page - page number
 * @property {Boolean} active - indicates if page is active
 * @property {Function} handlePaginationClick - function to handle click on pagination item
 *
 */
PaginationItem.propTypes = {
    page: PropTypes.number,
    active: PropTypes.bool,
    handlePaginationClick: PropTypes.func,
};

export default PaginationItem;