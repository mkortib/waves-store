import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSiteData } from '../../actions/site_actions';

import './find-us.scss';

class FindUs extends Component {
    componentDidMount() {
        if (Object.keys(this.props.site).length === 0) {
            this.props.dispatch(getSiteData());
        }
    }

    render() {
        const { siteData } = this.props.site;

        return (
            <div className="find-us">
                <div className="find-us-bg">Find Us</div>
                <div className="find-us-main">
                    <div className="find-us-main__info">
                        <div className="info-block">
                            <div className="info-block__address">
                                <span className="label">Address: </span>
                                <span>{siteData[0].address}</span>
                            </div>
                            <div className="info-block__phone">
                                <span className="label">Phone: </span>
                                <a href={`tel:${siteData[0].phone}`}>
                                    {siteData[0].phone}
                                </a>
                            </div>
                            <div className="info-block__hours">
                                <span className="label">Working hours: </span>
                                <span>{siteData[0].hours}</span>
                            </div>
                            <div className="info-block__email">
                                <span className="label">Email: </span>
                                <a href={`mailto:${siteData[0].email}`}>
                                    {siteData[0].email}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="find-us-main__map"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site,
    };
};

export default connect(mapStateToProps)(FindUs);
