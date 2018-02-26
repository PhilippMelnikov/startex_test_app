import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import SearchInput from '../components/SearchInput.jsx';
import ItemList from '../components/ItemList.jsx';
import Details from '../components/Details.jsx';
import Pagination from '../components/Pagination.jsx';

/**
* SearchContainer component
*/
export default class SearchContainer extends Component {
    constructor(props) {
        super(props);
        /**
         * @type {Object}
         * @property {String} searchTerm - search term to from a query
         * @property {Array} items - items, received as a result of search query
         * @property {Boolean} openDetails - open item details modal
         * @property {Object} selectedItem - item selected to view in details
         * @property {Boolean} loading - indicates if detais of item are loading or not
         * @property {Number} currentPage - current page in pagintion
         * @property {Number} pages - total number of pages
         */
        this.state = {
            searchTerm: "",
            items: [],
            openDetails: false,
            selectedItem: null,
            loading: false,
            currentPage: 0,
            pages: 0,
        }
        this.queryItems = debounce(this.queryItems, 600, { trailing: true });
    }

    /**
     * query items based on search term
     *
     * @param {Number} page - page number to add to query if we do pagination
     */
    queryItems = (page) => {
        let url = `/api/search?q=${this.state.searchTerm}`;
        if (page) {
            url += `&page=${page}`;
        }
        axios.get(url)
            .then((res) => {
                this.setState({
                    items: res.data.items ? res.data.items : [],
                    currentPage: +res.data.currentPage,
                    pages: +res.data.pages,
                })
            })
            .catch(error => console.log(error.message));
    }

    /**
     * handle search input
     * 
     * get input from event and pass it for further processing 
     * @param {SytheticEvent} e
     */
    handleSearchInput = (e) => {
        const searchTerm = e.target.value;
        if (searchTerm === '') {
            return this.setState({
                searchTerm: "",
                items: [],
                currentPage: 0,
                pages: 0,
            })
        }
        this.setState({ searchTerm });
        this.queryItems();
    }

    /**
     * query details of selected item
     * 
     * @param {String} uuid - id of the item
     */
    getDetails = (uuid) => {
        const url = `/api/details/${uuid}`;
        axios.get(url)
            .then((res) => {
                this.setState({
                    selectedItem: res.data,
                    loading: false
                });
            })
            .catch(error => console.log('error: ', error.message));
    }

    /**
     * handle select of item
     * 
     * @param {String} uuid - id of the item
     */
    handleSelect = (uuid) => {
        this.setState({
            openDetails: true,
            loading: true,
        });
        this.getDetails(uuid);
    }

    /**
     * close details modal window
     */
    handleCloseModal = () => {
        this.setState({
            openDetails: false,
            selectedItem: null
        });
    }

    /**
    * handle pagination click
    * 
    * @param {Number} page - selected page
    */
    handlePaginationClick = (page) => {
        this.queryItems(page);
    }

    render() {
        return (
            <div className="container search__container">
                <SearchInput
                    handleSearchInput={this.handleSearchInput}
                />
                <ItemList
                    items={this.state.items}
                    handleSelect={this.handleSelect}
                />
                <Details
                    open={this.state.openDetails}
                    loading={this.state.loading}
                    handleCloseModal={this.handleCloseModal}
                    item={this.state.selectedItem}
                />
                {
                    this.state.currentPage > 0 && <Pagination
                        currentPage={this.state.currentPage}
                        pages={this.state.pages}
                        handlePaginationClick={this.handlePaginationClick}
                    />
                }
            </div>
        )
    }
}