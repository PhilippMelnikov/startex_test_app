import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import modalStyles from '../constants/modalStyles';

/**
 * Details component
 */
const Details = ({ open, loading, handleCloseModal, item }) => {
    return (
        <Modal
            isOpen={open}
            onRequestClose={handleCloseModal}
            style={modalStyles}
            contentLabel="Example Modal"
            ariaHideApp={true}
        >
            {
                loading && <div className="loading__spinner"></div>
            }
            {
                item && (
                    <div className="details__container">
                        <div className="details__primary-block">
                            <div className="details__img-container">
                                <img src={item.image} alt="img" />
                            </div>
                            <div className="details__info-container">
                                <h3 className="details__title">{item.title}</h3>
                                {
                                    item.genres.length > 0 && <div className="details__genre-container">
                                        {
                                            item.genres.map((genre) => {
                                                return (
                                                    <a
                                                        href={genre.uri}
                                                        target="_blank"
                                                        className="details__genre-badge"
                                                        key={genre.title}
                                                    >
                                                        {genre.title}
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    item.topics.length > 0 && <div className="details__topics-container">
                                        {
                                            item.topics.map((topic) => {
                                                if (!topic) {
                                                    return null;
                                                }
                                                return (
                                                    <div className="details__topic" key={topic}>
                                                        {topic}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    item.place && <div className="basic-info-item details__place">
                                        <img src="/img/location.svg" alt="location" />
                                        <span>{item.place}</span>
                                    </div>
                                }
                                {
                                    item.publisher && <div className="basic-info-item details__publisher">
                                        <img src="/img/print.svg" alt="publisher" />
                                        <span>{item.publisher}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="details__secondary-block">
                            <div className="details__copyright-block">
                                <h3>Copyright Statement</h3>
                                <p className="details__copyright">
                                    {item.rightsStatement}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </Modal>
    )
}

/**
 * @type {Object}
 * @property {Boolean} open - indicates if modal is open
 * @property {Boolean} loading - indicates if item is loading
 * @property {Function} handleCloseModal - function to handle modal close event
 * @property {Object} item - item to display
 *
 */
Details.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    item: PropTypes.object,
};

export default Details;