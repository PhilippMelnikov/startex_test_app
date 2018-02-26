import React from 'react';
import PropTypes from 'prop-types';

/**
 * Item component
 */
const Item = ({ item, handleSelect }) => {
    return (
        <div className="item">
            <a href="#"
                className="item__title"
                onClick={(e) => {
                    e.preventDefault();
                    handleSelect(item.uuid);
                }}
            >{item.title}</a>
            <div className="basic-info-item item__resource-type">
                <img src="/img/file.svg" alt="resource-type" />
                <span>{item.typeOfResource}</span>
            </div>
            <a href={item.itemLink} className="basic-info-item item__external-link" target="_blank">
                <img src="/img/link.svg" alt="link" />
                <span>NYPL Digital Collections</span>
            </a>
        </div>
    )
};

/**
 * @type {Object}
 * @property {Object} item - item to display
 * @property {Function} handleSelect - function to handle item select
 *
 */
Item.propTypes = {
    item: PropTypes.object,
    handleSelect: PropTypes.func,
};

export default Item;