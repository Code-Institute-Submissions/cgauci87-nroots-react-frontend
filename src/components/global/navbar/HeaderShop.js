import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import HeaderRight from './HeaderRightShop';
import Navbar from './NavbarShop';
import data from '../../../../src/data/topbar-text.json';

// HeaderShop Component

function HeaderShop({ options }) {

    return (
        <Fragment>
            {/* start header */}
            <header id="header" className="site-header header-style-1">
                <div className="topbar">
                    <div className="topbar-text">
                        {/* load data from static content */}
                        <p>{data.content}</p>
                    </div>
                </div>
                {/* end topbar */}
                <nav className="navigation navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {/* toogle navigation for mobile devices */}
                            <button type="button" className="open-btn" onClick={options.onMobleNavClick}> 
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <Link className="mobile-only navbar-brand" to="/">
                                {/* dispaying logo */}
                                <img src={process.env.PUBLIC_URL + "logo64px.png"} alt="logo"/> 
                            </Link>

                        </div>

                        <Navbar options={options}/>

                        <HeaderRight options={options} />

                    </div>
                    {/* end of container */}
                </nav>
            </header>
            {/* end of header */}
        </Fragment>
    );
}

export default HeaderShop;