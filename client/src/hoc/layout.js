import React, { Component } from 'react';

import Header from '../components/Header-footer/Header';
import Footer from '../components/Header-footer/Footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="page_container">{this.props.children}</div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
