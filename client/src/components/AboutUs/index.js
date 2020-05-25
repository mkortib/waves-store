import React, { Component } from 'react';

import './about-us.scss';

class AboutUs extends Component {
    render() {
        return (
            <div className="about-us">
                <div className="about-us-block">
                    <div className="about-us-block__left">
                        <h2 className="about-us-block__title">Who We Are</h2>
                        <div className="about-us-block__txt">
                            Glasses Store was founded in 2015 by Max, based on
                            the simple premise that working with good people,
                            making good things, made good sense. We have worked
                            hard to source, collect and edit the best of British
                            and Irish design carefully crafted things for the
                            home that are designed and made on these shores.
                        </div>
                    </div>

                    <div className="about-us-block__right">
                        <h2 className="about-us-block__title">What We Do</h2>
                        <div className="about-us-block__txt">
                            Our products are designed with thought to their
                            purpose and are made carefully. They require skill
                            and knowledge from the designer and the maker, they
                            might have a history, they might preserve a
                            tradition, maintain a heritage or support an
                            industry. Almost all have a story to tell
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;
