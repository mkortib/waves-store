import React, { Component } from 'react';
import HomeSlider from './home-slider';
import HomePromotion from './home-promotion';
import CardBlock from '../utils/CardBlock/card-block';
import { connect } from 'react-redux';
import {
    getProductsByArrival,
    getProductsBySell,
} from '../../actions/products_actions';

import './home.scss';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        return (
            <div className="home-cnt">
                <HomeSlider />
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                    history={this.props.history}
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
