import React from 'react';
import CardBlockShop from '../utils/card-block-shop';

const LoadmoreCards = (props) => {
    return (
        <div className="products__grid">
            <div className="products__grid-item">
                <CardBlockShop grid={props.grid} list={props.products} />
            </div>

            {/* load more */}
            {props.size > 0 && props.size >= props.limit ? (
                <div className="load-more">
                    <span onClick={() => props.loadMore()}>Load More</span>
                </div>
            ) : null}
        </div>
    );
};

export default LoadmoreCards;
