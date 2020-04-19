import React, { Component } from 'react';
import MyButton from './button';

class Card extends Component {
    renderCardImage(images) {
        if (!images.length) {
            return '/images/image_not_availble.png';
        }

        return images[0].url;
    }

    render() {
        const props = this.props;
        console.log(props);

        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(
                            props.images
                        )}) no-repeat`,
                    }}
                ></div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{props.brand.name}</div>
                        <div className="name">{props.name}</div>
                        <div className="name">${props.price}</div>
                    </div>
                    {props.grid ? (
                        <div className="description">
                            <p>{props.description}</p>
                        </div>
                    ) : null}
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_details/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0',
                                }}
                            />
                        </div>

                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                runAction={() => console.log('added to card')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
