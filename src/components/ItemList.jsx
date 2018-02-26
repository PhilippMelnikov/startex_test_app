import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item.jsx';

/**
 * ItemList component
 */
const ItemList = ({ items, handleSelect }) => {
    return items.map(item => <Item
        item={item}
        handleSelect={handleSelect}
        key={item.uuid}
    />)
};

/**
 * @type {Object}
 * @property {Array} items - items to display
 * @property {Function} handleSelect - function to handle item select
 *
 */
ItemList.propTypes = {
    items: PropTypes.array,
    handleSelect: PropTypes.func,
};

export default ItemList;