import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';

import Dialog from '@material-ui/core/Dialog';

class ResetPass extends Component {
    state = {
        resetToken: '',
        formErrorMessage: '',
        formError: false,
        formSuccess: false,
        formData: {
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

        axios
            .post('/api/user/reset_password', {
                ...dataToSubmit,
                resetToken: this.state.resetToken,
            })
            .then((response) => {
                if (!response.data.success) {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.data.message,
                    });

                    return;
                }

                this.setState({ formError: false, formSuccess: true });

                setTimeout(() => {
                    this.props.history.push('/register_login');
                }, 3000);
            })
            .catch((error) => {});
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'register');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    componentDidMount() {
        const resetToken = this.props.match.params.token;

        this.setState({ resetToken });
    }

    render() {
        return (
            <div className="cm-container">
                <form
                    onSubmit={(event) => this.submitForm(event)}
                    style={{ marginTop: '40px' }}
                >
                    <h2>Reset password</h2>
                    <div className="form-block-two">
                        <div className="block">
                            <FormField
                                id={'password'}
                                formdata={this.state.formData.password}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'confirmPassword'}
                                formdata={this.state.formData.confirmPassword}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>

                    <div className="">
                        {this.state.formError ? (
                            <div className="error_label">
                                {this.state.formErrorMessage}
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
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div
                            style={{
                                color: '#ffd32c',
                                textAlign: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            Allright!!
                        </div>
                        <div className="">
                            Your password was reseted... Go to login page
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResetPass;
