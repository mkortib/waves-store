import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';

const HomeSlider = () => {
    const slides = [
        {
            img: '/images/featured/home-slide-1.jpg',
            lineOne: 'Limited Edition',
            lineTwo: 'The Height of Performance and Tone',
            linkTitle: 'Shop now',
            linkTo: '/shop',
        },
        {
            img: '/images/featured/home-slide-2.jpg',
            lineOne: 'Achieve your Zenith',
            lineTwo: 'Awesome descounts',
            linkTitle: 'View offers',
            linkTo: '/shop',
        },
        {
            img: '/images/featured/home-slide-3.jpg',
            lineOne: 'AZ series',
            lineTwo:
                'Unparalleled Sound, Maximum Playability and Exquisite Beauty',
            linkTitle: 'Explore',
            linkTo: '/shop',
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slideToShow: 1,
        slideToScroll: 1,
        arrows: false,
    };

    const generateSlides = () =>
        slides
            ? slides.map((item, i) => (
                  <div key={i}>
                      <div
                          className="home-slide__image"
                          style={{
                              backgroundImage: `url(${item.img})`,
                          }}
                      >
                          <div className="cm-container">
                              <div className="home-slide__actions">
                                  <div className="home-slide__title">
                                      {item.lineOne}
                                  </div>
                                  <div className="home-slide__description">
                                      {item.lineTwo}
                                  </div>
                                  <div className="">
                                      <MyButton
                                          type="default"
                                          title={item.linkTitle}
                                          linkTo={item.linkTo}
                                          altClass="home-slide__btn"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              ))
            : null;

    return (
        <div className="home-slider">
            <Slider {...settings}>{generateSlides()}</Slider>
        </div>
    );
};

export default HomeSlider;
