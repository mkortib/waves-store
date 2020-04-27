import React from 'react';
import Card from '../Card/card';
import './card-block.scss';

const CardBlock = (props) => {
    const renderCards = (list) =>
        list ? list.map((card, i) => <Card key={i} {...card} />) : null;

    return (
        <div className="cards-block">
            <div className="cm-container">
                {props.title ? (
                    <div className="cards-block__title">{props.title}</div>
                ) : null}
                <div className="cards-block__cards">
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;
