import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';

import {
    clearProductDetail,
    getProductDetail,
} from '../../actions/products_actions';

import ProdNfo from './prodNfo';
import ProdImg from './prodImg';

class ProductPage extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(getProductDetail(id)).then((response) => {
            if (!this.props.products.productDetail) {
                // !!!!!!!!!!! CREATE 404 PAGE
                console.log('no products');
            }
        });

        console.log(id);
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    render() {
        return (
            <div className="">
                <PageTop title="Product Detail" />

                <div className="container">
                    {this.props.products.productDetail ? (
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div className="" style={{ width: '500px' }}>
                                    <ProdImg
                                        details={
                                            this.props.products.productDetail
                                        }
                                    />
                                </div>
                            </div>

                            <div className="right">
                                <ProdNfo
                                    addToCart={(id) =>
                                        this.addToCartHandler(id)
                                    }
                                    details={this.props.products.productDetail}
                                />
                            </div>
                        </div>
                    ) : (
                        'Loading'
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

export default connect(mapStateToProps)(ProductPage);
