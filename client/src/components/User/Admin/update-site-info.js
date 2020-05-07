import React, { Component } from 'react';
import {
    update,
    generateData,
    isFormValid,
    populateFields,
} from '../../utils/Form/formActions';
import FormField from '../../utils/Form/formfield';

import { connect } from 'react-redux';
import { getSiteData, updateSiteData } from '../../../actions/site_actions';

class UpdateSiteNnfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter your site address',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Shop email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
        },
    };

    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            const newFormData = populateFields(
                this.state.formData,
                this.props.site.siteData[0]
            );

            this.setState({ formData: newFormData });
        });
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'site_info');
        let formIsValid = isFormValid(this.state.formData, 'site_info');

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
            this.setState({ formSuccess: true }, () => {
                setTimeout(() => {
                    this.setState({ formSuccess: false });
                }, 2000);
            });
        });
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'site_info');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }
    render() {
        return (
            <div className="site-info">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h1 className="site-info__title">Site info</h1>
                    <FormField
                        id={'address'}
                        formdata={this.state.formData.address}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'hours'}
                        formdata={this.state.formData.hours}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'phone'}
                        formdata={this.state.formData.phone}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <div className="">
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">
                                Please check your data
                            </div>
                        ) : null}

                        <button
                            className="link-default link-default--user"
                            onClick={(event) => this.submitForm(event)}
                        >
                            Update site info
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site,
    };
};

export default connect(mapStateToProps)(UpdateSiteNnfo);
