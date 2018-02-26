import React from 'react';
import PropTypes from 'prop-types';

import PaginationItem from './PaginationItem.jsx';


/**
 * Pagination component
 */
const Pagination = ({ currentPage, pages, handlePaginationClick }) => {

    let pageItems = [];

    if (currentPage < 3) {
        const paginationCount = pages < 4 ? pages : 3;
        for (let i = 1; i <= paginationCount; i++) {
            const active = i === currentPage ? true : false;
            pageItems.push(
                <PaginationItem
                    key={pageItems.length + 1}
                    page={i}
                    active={active}
                    handlePaginationClick={handlePaginationClick}
                />
            );
        };
    } else {
        if (pages > 3 && currentPage - 2 > 0) {
            pageItems.push(
                <PaginationItem
                    key={pageItems.length + 1}
                    page={1}
                    active={false}
                    handlePaginationClick={handlePaginationClick}
                />
            );
            pageItems.push(<li key={pageItems.length + 1}>...</li>);
        }
        if (currentPage === pages && pages > 2) {
            pageItems.push(
                <PaginationItem
                    key={pageItems.length + 1}
                    page={currentPage - 2}
                    active={false}
                    handlePaginationClick={handlePaginationClick}
                />
            );
        }
        pageItems.push(
            <PaginationItem
                key={pageItems.length + 1}
                page={currentPage - 1}
                active={false}
                handlePaginationClick={handlePaginationClick}
            />
        );
        pageItems.push(
            <PaginationItem
                key={pageItems.length + 1}
                page={currentPage}
                active={true}
                handlePaginationClick={handlePaginationClick}
            />
        );
        if (currentPage + 1 <= pages) {
            pageItems.push(
                <PaginationItem
                    key={pageItems.length + 1}
                    page={currentPage + 1}
                    active={false}
                    handlePaginationClick={handlePaginationClick}
                />
            );
        }
    }

    if (currentPage + 1 < pages && pages > 3) {
        pageItems.push(<li key={pageItems.length + 1}>...</li>);
        pageItems.push(
            <PaginationItem
                key={pageItems.length + 1}
                page={pages}
                active={false}
                handlePaginationClick={handlePaginationClick}
            />
        );
    }

    return (
        <div className="pagination">
            <ul>
                {pageItems}
            </ul>
        </div>
    );
};

/**
 * @type {Object}
 * @property {Number} currentPage - current page number
 * @property {Number} pages - total amount of pages
 * @property {Function} handlePaginationClick - function to handle click on pagination item
 *
 */
Pagination.propTypes = {
    currentPage: PropTypes.number,
    pages: PropTypes.number,
    handlePaginationClick: PropTypes.func,
};

export default Pagination;
