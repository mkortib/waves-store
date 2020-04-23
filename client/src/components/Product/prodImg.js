import React, { Component } from 'react';
import ImageLightbox from '../utils/lightbox';

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

    showThumbs = () =>
        this.state.lightboxImages.map((item, i) =>
            i > 0 ? (
                <div
                    key={i}
                    onClick={() => this.handleLightBox(i)}
                    className="thumb"
                    style={{
                        background: `url(${item}) no-repeat`,
                    }}
                ></div>
            ) : null
        );

    render() {
        const { details } = this.props;

        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{
                            background: `url(${this.renderCardImages(
                                details.images
                            )}) no-repeat`,
                        }}
                        onClick={() => this.handleLightBox(0)}
                    ></div>
                    <div className="main_thumbs">
                        {this.showThumbs(details)}
                    </div>
                    {this.state.lightbox ? (
                        <ImageLightbox
                            id={details.id}
                            images={this.state.lightboxImages}
                            open={this.state.open}
                            pos={this.state.imagePos}
                            onClose={() => this.handleLightBoxClose()}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default ProdImg;
