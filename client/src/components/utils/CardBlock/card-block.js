import React from 'react';
import Card from '../Card/card';
import Slider from 'react-slick';

import './card-block.scss';

const CardBlock = (props) => {
    const renderCards = (list) =>
        list ? list.map((card, i) => <Card key={i} {...card} />) : null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slideToShow: 1,
        slideToScroll: 1,
        arrows: false,
    };

    const mobileView = () => (
        <Slider {...settings}>{renderCards(props.list)}</Slider>
    );

    return (
        <div className="cards-block">
            <div className="cm-container">
                {props.title ? (
                    <div className="cards-block__title">{props.title}</div>
                ) : null}
                {window.innerWidth < 600 ? (
                    mobileView()
                ) : (
                    <div className="cards-block__cards">
                        {renderCards(props.list)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardBlock;
