import React, { Component } from 'react';
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from '../../utils/Form/formActions';
import FormField from '../../utils/Form/formfield';
import { connect } from 'react-redux';

import { getBrands, addBrand } from '../../../actions/products_actions';

class ManageBrands extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the brand',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        },
    };

    componentDidMount() {
        this.props.dispatch(getBrands());
    }

    showCategoryItems() {
        return this.props.products.brands
            ? this.props.products.brands.map((item, i) => (
                  <div className="category-item" key={item._id}>
                      {item.name}
                  </div>
              ))
            : null;
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'brands');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    resetFieldsHandler() {
        const newFormData = resetFields(this.state.formData, 'brands');

        this.setState({
            formData: newFormData,
            formSuccess: true,
        });
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'brands');
        let formIsValid = isFormValid(this.state.formData, 'brands');
        let existingBrands = this.props.products.brands;

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        this.props
            .dispatch(addBrand(dataToSubmit, existingBrands))
            .then((response) => {
                if (!response.payload.success) {
                    return;
                }

                this.resetFieldsHandler();
            });
    }

    render() {
        return (
            <div className="admin-category-wrapper">
                <h1>Brands</h1>
                <div className="admin-two-column">
                    <div className="left">
                        <div className="brands-container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formData.name}
                                change={(element) => this.updateForm(element)}
                            />
                            {/* {this.state.formSuccess ? (
                                <div className="form_success">Success</div>
                            ) : null} */}

                            {this.state.formError ? (
                                <div className="error_label">
                                    Please check your data
                                </div>
                            ) : null}

                            <button
                                className="link-default link-default--user"
                                onClick={(event) => this.submitForm(event)}
                            >
                                Add Brand
                            </button>
                        </form>
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

export default connect(mapStateToProps)(ManageBrands);
