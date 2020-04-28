import React from 'react';
import Card from './Card/card';

const CardBlockShop = (props) => {
    const renderCards = (list) =>
        list
            ? list.map((card) => (
                  <Card key={card._id} {...card} grid={props.grid} />
              ))
            : null;

    return (
        <div className="card-block-shop">
            <div className="card-block-shop__cnt">
                <div className="card-block-shop__center">
                    {props.list ? (
                        props.list.length === 0 ? (
                            <div className="no-result">Sorry, no results</div>
                        ) : null
                    ) : null}
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

export default CardBlockShop;
