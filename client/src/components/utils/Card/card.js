import React, { Component } from 'react';
import MyButton from '../button';

import { connect } from 'react-redux';
import { addToCart } from '../../../actions/user_actions';

import { withRouter } from 'react-router-dom';

import './card.scss';

class Card extends Component {
    renderCardImage(images) {
        if (!images.length) {
            // return '/images/image_not_availble.png';
            return '/images/test-img.png';
        }

        return images[0].url;
    }

    render() {
        const props = this.props;
        const prodId = this.props._id;

        console.log('Card', props);
        return (
            <div
                className={`card-item ${props.grid}`}
                onClick={() => props.history.push(`/product_details/${prodId}`)}
            >
                <div
                    className="card-item__image"
                    style={{
                        backgroundImage: `url(${this.renderCardImage(
                            props.images
                        )})`,
                    }}
                ></div>
                <div className="card-item__actions">
                    <div className="card-item__tags">
                        <div className="tag-brand">{props.brand.name}</div>
                        <div className="tag-name">{props.name}</div>
                        <div className="tag-price">$ {props.price}</div>
                    </div>
                    {props.grid ? (
                        <div className="card-item__description">
                            <p>{props.description}</p>
                        </div>
                    ) : null}
                    <div className="actions">
                        {/* <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_details/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0',
                                }}
                            />
                        </div> */}

                        <div className="card-item__add">
                            <MyButton
                                type="bag_link"
                                runAction={() => {
                                    props.user.userData.isAuth
                                        ? this.props.dispatch(
                                              addToCart(props._id)
                                          )
                                        : console.log('You nedd ti login');
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(Card));
