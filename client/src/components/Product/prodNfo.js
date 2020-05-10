import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import SimpleTabs from '../utils/tabs';

const ProdNfo = (props) => {
    const showProdTags = (detail) => (
        <div className="product-tags">
            {/* !!!!!!!!!!!!!!! CHANGE SHIPPING */}
            {!detail.shipping ? (
                <div className="tag">
                    <div className="tag__icon">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="tag__text">
                        <div className="">free shipping</div>
                        <div className="">And Return</div>
                    </div>
                </div>
            ) : null}
            {detail.available ? (
                <div className="tag">
                    <div className="tag__icon">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className="tag__text">
                        <div>Available</div>
                        <div>in store</div>
                    </div>
                </div>
            ) : (
                <div className="tag">
                    <div className="tag__icon">
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="tag__text">
                        <div className="">Not Available</div>
                        <div className="">Preorder only</div>
                    </div>
                </div>
            )}
        </div>
    );

    const showProdActions = (detail) => (
        <div className="product-actions">
            <MyButton
                type="add_to_cart_link"
                runAction={() => props.addToCart(detail._id)}
            />
        </div>
    );

    const showProdSpecifications = (details) => (
        <div className="product-specifications">
            <h2 className="product-specifications__title">Specifications</h2>
            <SimpleTabs specs={details} />
        </div>
    );

    const { details } = props;

    return (
        <div className="prod-details-cnt">
            <span className="prod-details-cnt__brand">
                {details.brand.name}
            </span>
            <h1 className="prod-details-cnt__name">{details.name}</h1>
            <div className="prod-details-cnt__price">$ {details.price}</div>
            {showProdSpecifications(details)}
            {showProdTags(details)}
            {showProdActions(details)}
        </div>
    );
};

export default ProdNfo;
