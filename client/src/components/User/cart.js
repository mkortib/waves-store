import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import {
    getCartItems,
    removeCartItem,
    onSuccessBuy,
} from '../../actions/user_actions';

import UserProductBlock from '../utils/User/product_block';

import Paypal from '../utils/paypal';

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    };

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length) {
                user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                });

                this.props
                    .dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {
                        if (this.props.user.cartDetail.length) {
                            this.calculateTotal(this.props.user.cartDetail);
                        }
                    });
            }
        }
    }

    calculateTotal(cartDetail) {
        let total = 0;

        cartDetail.forEach((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        this.setState({ total, showTotal: true });
    }

    showNoItemMessage() {
        return (
            <div className="cart_no_items">
                <FontAwesomeIcon icon={faFrown} />
                <div className="">You have no items</div>
            </div>
        );
    }

    showCompleteMessage() {
        return (
            <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div className="">Thank you</div>
                <div className="">Your order is now complete</div>
            </div>
        );
    }

    removeFromCart(id) {
        this.props.dispatch(removeCartItem(id)).then(() => {
            if (this.props.user.cartDetail.length <= 0) {
                this.setState({ showTotal: false });
            } else {
                this.calculateTotal(this.props.user.cartDetail);
            }
        });
    }

    transactionError(data) {}

    transactionCanceled(data) {}

    transactionSuccess(data) {
        this.props
            .dispatch(
                onSuccessBuy({
                    cartDetail: this.props.user.cartDetail,
                    paymentData: data,
                })
            )
            .then(() => {
                if (this.props.user.successBuy) {
                    this.setState({
                        showTotal: false,
                        showSuccess: true,
                    });
                }
            });
    }

    render() {
        return (
            <UserLayout>
                <div className="cart-layout">
                    <h1 className="cart-layout__title">My Cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {this.state.showTotal ? (
                            <div className="">
                                <div className="user-cart-sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                        ) : this.state.showSuccess ? (
                            this.showCompleteMessage()
                        ) : (
                            this.showNoItemMessage()
                        )}
                    </div>
                    {this.state.showTotal ? (
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={(data) =>
                                    this.transactionError(data)
                                }
                                transactionCanceled={(data) =>
                                    this.transactionCanceled(data)
                                }
                                onSuccess={(data) =>
                                    this.transactionSuccess(data)
                                }
                            />
                        </div>
                    ) : null}
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserCart);
