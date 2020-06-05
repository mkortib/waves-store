import React, { Component } from 'react';
import PageTop from '../utils/page-top';
import { connect } from 'react-redux';

import {
    clearProductDetail,
    getProductDetail,
    getProductsByArrival,
} from '../../actions/products_actions';

import { addToCart } from '../../actions/user_actions';

import ProdNfo from './prodNfo';
import ProdImg from './prodImg';

import CardBlock from '../utils/CardBlock/card-block';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../utils/snackbar';

import './product.scss';

class ProductPage extends Component {
    state = {
        open: false,
        variant: '',
        snackMessage: '',
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    renderSnack = () => (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
        >
            <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant={this.state.variant}
                message={this.state.snackMessage}
            />
        </Snackbar>
    );

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(getProductDetail(id)).then((response) => {
            if (!this.props.products.productDetail) {
                // !!!!!!!!!!! CREATE 404 PAGE
                console.log('no products');
            }
        });
        // new arrivals
        this.props.dispatch(getProductsByArrival());
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    addToCartHandler(id) {
        const { isAuth } = this.props.user.userData;
        const { name } = this.props.products.productDetail;

        console.log('object', this.props.products.productDetail.name);

        this.handleClick();

        if (isAuth) {
            this.props.dispatch(addToCart(id));

            this.setState({
                variant: 'success',
                snackMessage: `Guitar ${name} was add to cart`,
            });

            return;
        }

        this.setState({
            variant: 'error',
            snackMessage: 'You need to login first',
        });
    }

    render() {
        return (
            <div>
                <PageTop title="Product Detail" />
                <div className="cm-container">
                    {this.props.products.productDetail ? (
                        <div className="product-detail">
                            <div className="product-detail__left">
                                <ProdImg
                                    details={this.props.products.productDetail}
                                />
                            </div>

                            <div className="product-detail__right">
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
                <div className="product-detail__new">
                    <CardBlock
                        list={this.props.products.byArrival}
                        title="New Arrivals"
                    />
                </div>
                {/* Snack */}
                {this.renderSnack()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user,
    };
};

export default connect(mapStateToProps)(ProductPage);
