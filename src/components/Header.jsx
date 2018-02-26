import React from 'react';

/**
 * Header component
 */
const Header = (props) => {
    return (
        <header className="head">
            <div className="head__content container">
                <img className="head__logo" src="/img/logo.png" alt="logo" />
                <div className="head__title">
                    <h1>The New York Public Library</h1>
                </div>
            </div>
        </header>
    )
}

export default Header;