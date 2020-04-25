import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {
    const showProdTags = (detail) => (
        <div className="product_tags">
            {/* !!!!!!!!!!!!!!! CHANGE SHIPPING */}
            {!detail.shipping ? (
                <div className="tag">
                    <div className="">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="tag_text">
                        <div className="">free shipping</div>
                        <div className="">And Return</div>
                    </div>
                </div>
            ) : null}
            {detail.available ? (
                <div className="tag">
                    <div className="">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className="tag_text">
                        <div className="">Available</div>
                        <div className="">in store</div>
                    </div>
                </div>
            ) : (
                <div className="tag">
                    <div className="">
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="tag_text">
                        <div className="">Not Available</div>
                        <div className="">Preorder only</div>
                    </div>
                </div>
            )}
        </div>
    );

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">$ {detail.price}</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={() => props.addToCart(detail._id)}
                />
            </div>
        </div>
    );

    const showProdSpecifications = (details) => (
        <div className="product_specifications">
            <h2>Specifications</h2>
            <div className="">
                <div className="item">
                    <strong>Frets:</strong>
                    {details.frets}
                </div>
                <div className="item">
                    <strong>Wood:</strong>
                    {details.wood.name}
                </div>
            </div>
        </div>
    );

    const { details } = props;
    return (
        <div className="">
            <h1>
                {details.brand.name} {details.name}
            </h1>
            <p>{details.description}</p>
            {showProdTags(details)}
            {showProdActions(details)}
            {showProdSpecifications(details)}
        </div>
    );
};

export default ProdNfo;
