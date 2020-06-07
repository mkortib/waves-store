import React from 'react';
import MyButton from '../utils/button';

const HomePromotion = () => {
    const promotion = {
        img: '/images/featured/home-promo.png',
        imgBg: '/images/featured/promo-bg.jpg',
        lineOne: 'Great Guitar Brands!',
        lineTwo:
            'Whether You Want To Rock Out In Front Of Millions Or Learn Your Favorite Song, The Guitar Is The Ultimate Portable Music Making Tool.',
        lineThreeFirst: '50%',
        lineThreeSecond: 'Off Best Sellers',
        linkTitle: 'Shop now',
        linkTo: '/shop',
    };

    const renderPromotion = () =>
        promotion ? (
            <div className="cm-container">
                <div className="home-promotion__img">
                    <div className="home-promotion__title">
                        {promotion.lineOne}
                    </div>
                    <div className="home-promotion__description">
                        {promotion.lineTwo}
                    </div>
                    <div className="home-promotion__guitar">
                        <img src={promotion.img} alt="" />
                    </div>
                    <div className="home-promotion__sale">
                        <span className="sale-number">
                            {promotion.lineThreeFirst}
                        </span>
                        <span className="sale-label">
                            {promotion.lineThreeSecond}
                        </span>
                    </div>
                    <div className="home-promotion__action">
                        <MyButton
                            type="default"
                            title={promotion.linkTitle}
                            linkTo={promotion.linkTo}
                            className="shop-promotion"
                        />
                    </div>
                </div>
            </div>
        ) : null;

    return (
        <div
            className="home-promotion"
            style={{
                backgroundImage: `url(${promotion.imgBg})`,
            }}
        >
            {renderPromotion()}
        </div>
    );
};

export default HomePromotion;
