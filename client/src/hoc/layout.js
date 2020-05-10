import React, { Component } from 'react';

import Header from '../components/Header-footer/Header';
import Footer from '../components/Header-footer/Footer';

import { connect } from 'react-redux';
import { getSiteData } from '../actions/site_actions';

import './user-layout.scss';

class Layout extends Component {
    componentDidMount() {
        if (Object.keys(this.props.site).length === 0) {
            this.props.dispatch(getSiteData());
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div
                    className="page-container"
                    style={{ padding: '95px 0 40px' }}
                >
                    {this.props.children}
                </div>
                <Footer data={this.props.site} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site,
    };
};

export default connect(mapStateToProps)(Layout);
