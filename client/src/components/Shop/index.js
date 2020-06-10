import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTop from '../utils/page-top';
import LoadmoreCards from './loadmoreCards';
import {
    getProductsToShop,
    getBrands,
    getWoods,
} from '../../actions/products_actions';
import CollapseCheckbox from '../utils/collapse-checkbox';
import CollapseRadio from '../utils/collapse-radio';
import { frets, price } from '../utils/Form/fixed_categories';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

import './shop.scss';

class Shop extends Component {
    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: [],
        },
    };

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(
            getProductsToShop(
                this.state.skip,
                this.state.limit,
                this.state.filters
            )
        );
    }

    handlePrice(value) {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    }

    handleFilters(filters, category) {
        const newFilters = { ...this.state.filters };

        newFilters[category] = filters;

        if (category === 'price') {
            let priceValues = this.handlePrice(filters);

            newFilters[category] = priceValues;
        }

        this.showFilteredResults(newFilters);
        this.setState({ filters: newFilters });
    }

    showFilteredResults(filters) {
        this.props
            .dispatch(getProductsToShop(0, this.state.limit, filters))
            .then(() => this.setState({ skip: 0 }));
    }

    LoadMoreCards() {
        let skip = this.state.skip + this.state.limit;

        this.props
            .dispatch(
                getProductsToShop(
                    skip,
                    this.state.limit,
                    this.state.filters,
                    this.props.products.toShop
                )
            )
            .then(() => this.setState({ skip }));
    }

    handleGrid() {
        this.setState({
            grid: !this.state.grid ? 'grid--bars' : '',
        });
    }

    render() {
        const products = this.props.products;

        return (
            <div className="category">
                <PageTop title="Browse Products" />
                <div className="cm-container">
                    <div className="category__wrapper">
                        <div className="category__filters">
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, 'brand')
                                }
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, 'frets')
                                }
                            />
                            <CollapseCheckbox
                                initState={true}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, 'wood')
                                }
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, 'price')
                                }
                            />
                        </div>

                        <div className="category__products">
                            <div className="category__view">
                                <div className="view-choose">
                                    <div
                                        className={`view-choose__btn ${
                                            this.state.grid ? '' : 'active'
                                        }`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTh}
                                            className="icon-view"
                                        />
                                    </div>
                                    <div
                                        className={`view-choose__btn ${
                                            !this.state.grid ? '' : 'active'
                                        }`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBars}
                                            className="icon-view"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="products">
                                <LoadmoreCards
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={() => this.LoadMoreCards()}
                                />
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, null)(Shop);
