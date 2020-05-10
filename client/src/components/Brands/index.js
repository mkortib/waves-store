import React, { Component } from 'react';
import PageTop from '../utils/page-top';

import { connect } from 'react-redux';
import { getBrands } from '../../actions/products_actions';

import './brands.scss';

class Brands extends Component {
    componentDidMount() {
        this.props.dispatch(getBrands());
    }

    render() {
        const { brands } = this.props.products;

        return (
            <div className="cm-container">
                <PageTop title="Quality Brands We Stock" />
                <div className="brands-grid">
                    {brands
                        ? brands.map((item) => (
                              <div className="brands-grid__item" key={item._id}>
                                  <img
                                      src={
                                          item.img
                                              ? item.img
                                              : '/images/image_not_availble.png'
                                      }
                                      alt={item.name}
                                  />
                              </div>
                          ))
                        : null}
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

export default connect(mapStateToProps)(Brands);
