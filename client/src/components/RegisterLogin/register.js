import React, { Component } from 'react';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
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
                    placeholder: 'Enter your name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            email: {
                element: 'input',
                value: '',
                config: {
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
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password',
                },
                validation: {
                    required: true,
                    confirm: 'password',
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        },
    };

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'register');
        let formIsValid = isFormValid(this.state.formData, 'register');

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        this.props
            .dispatch(registerUser(dataToSubmit))
            .then((response) => {
                if (!response.payload.success) {
                    this.setState({
                        formError: true,
                    });

                    return;
                }

                this.setState({
                    formError: false,
                    formSuccess: true,
                });

                setTimeout(() => {
                    this.props.history.push('/register_login');
                }, 3000);
            })
            .catch((error) => this.setState({ formError: true }));
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'register');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    render() {
        return (
            <div className="register-container">
                <div className="cm-container">
                    <div className="left">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <h2 className="title">Personal information</h2>
                            <div className="form-block-two">
                                <div className="block">
                                    <FormField
                                        id={'name'}
                                        formdata={this.state.formData.name}
                                        change={(element) =>
                                            this.updateForm(element)
                                        }
                                    />
                                </div>
                                <div className="block">
                                    <FormField
                                        id={'lastname'}
                                        formdata={this.state.formData.lastname}
                                        change={(element) =>
                                            this.updateForm(element)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="email-field">
                                <FormField
                                    id={'email'}
                                    formdata={this.state.formData.email}
                                    change={(element) =>
                                        this.updateForm(element)
                                    }
                                />
                            </div>
                            <h2 className="title">Verify password</h2>
                            <div className="form-block-two">
                                <div className="block">
                                    <FormField
                                        id={'password'}
                                        formdata={this.state.formData.password}
                                        change={(element) =>
                                            this.updateForm(element)
                                        }
                                    />
                                </div>
                                <div className="block">
                                    <FormField
                                        id={'confirmPassword'}
                                        formdata={
                                            this.state.formData.confirmPassword
                                        }
                                        change={(element) =>
                                            this.updateForm(element)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="">
                                {this.state.formError ? (
                                    <div className="error_label">
                                        Please check your data
                                    </div>
                                ) : null}

                                <button
                                    onClick={(event) => this.submitForm(event)}
                                    className="link-default link-default--register"
                                >
                                    Create an account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div
                            style={{
                                color: '#ffd32c',
                                marginBottom: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            Congratulations!!
                        </div>
                        <div style={{ fontSize: '2.2rem' }}>
                            You will redirected to the LOGIN a couple seconds...
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(Register));
