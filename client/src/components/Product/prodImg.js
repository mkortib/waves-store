import React, { Component } from 'react';
import ImageLightbox from '../utils/lightbox';
import Slider from 'react-slick';

class ProdImg extends Component {
    state = {
        lightbox: false,
        imagePos: 0,
        lightboxImages: [],
    };

    componentDidMount() {
        if (this.props.details.images.length) {
            let lightboxImages = [];

            this.props.details.images.forEach((item) => {
                lightboxImages.push(item.url);
            });

            this.setState({ lightboxImages });
        }
    }

    renderCardImages(images) {
        if (images.length) {
            return images[0].url;
        } else {
            return '/images/image_not_available.png';
        }
    }

    handleLightBox(pos) {
        if (this.state.lightboxImages.length) {
            this.setState({ lightbox: true, imagePos: pos });
        }
    }

    handleLightBoxClose() {
        this.setState({ lightbox: false });
    }

    mobileImgView() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slideToShow: 1,
            slideToScroll: 1,
            arrows: true,
            adaptiveHeight: true,
        };

        return (
            <Slider {...settings}>
                {this.props.details.images.map((img, key) => (
                    <div className="mobile-product-img" key>
                        <img src={img.url} />
                    </div>
                ))}
            </Slider>
        );
    }

    showThumbs = () =>
        this.state.lightboxImages.map((item, i) =>
            i > 0 ? (
                <div
                    key={i}
                    onClick={() => this.handleLightBox(i)}
                    className="thumb"
                >
                    <img src={item} alt="thumb-img" />
                </div>
            ) : null
        );

    render() {
        const { details } = this.props;

        return (
            <React.Fragment>
                {window.innerWidth > 600 ? (
                    <div className="product-image">
                        <div className="product-image__thumbs">
                            {this.showThumbs(details)}
                        </div>
                        <div
                            onClick={() => this.handleLightBox(0)}
                            className="product-image__main"
                        >
                            <img
                                src={this.renderCardImages(details.images)}
                                alt="main-img"
                            />
                        </div>
                    </div>
                ) : (
                    this.mobileImgView()
                )}
                {this.state.lightbox ? (
                    <ImageLightbox
                        id={details.id}
                        images={this.state.lightboxImages}
                        open={this.state.open}
                        pos={this.state.imagePos}
                        onClose={() => this.handleLightBoxClose()}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

export default ProdImg;
