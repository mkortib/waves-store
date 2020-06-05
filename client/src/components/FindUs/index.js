import React, { Component } from 'react';

import './find-us.scss';

class FindUs extends Component {
    render() {
        return (
            <div className="find-us">
                <div className="find-us-bg">Find Us</div>
                <div className="find-us-main">
                    <div className="find-us-main__info">
                        <div className="info-block">
                            <div className="info-block__address">
                                <span className="label">Address: </span>
                                <span>Some address 3</span>
                            </div>
                            <div className="info-block__phone">
                                <span className="label">Phone: </span>
                                <a href="tel:06666666">0666 66 666</a>
                            </div>
                            <div className="info-block__hours">
                                <span className="label">Working hours: </span>
                                <span>Mon-Sun 9-10</span>
                            </div>
                            <div className="info-block__email">
                                <span className="label">Email: </span>
                                <a href="mailto:some@email.com">
                                    some@email.com
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

export default FindUs;
