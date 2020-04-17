import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/cart_block';
import { connect } from 'react-redux';

import {
    getProductsByArrival,
    getProductsBySell,
} from '../../actions/products_actions';

class Home extends Component {
    componentDidMount() {
        this.props
            .dispatch(getProductsBySell())
            .then((res) => console.log(res));
        this.props
            .dispatch(getProductsByArrival())
            .then((res) => console.log(res));
    }

    render() {
        return (
            <div className="">
                <HomeSlider />
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotion />
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

export default connect(mapStateToProps)(Home);
