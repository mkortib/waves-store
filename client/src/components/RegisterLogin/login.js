import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
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
        },
    };

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'login');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    };

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'login');
        let formIsValid = isFormValid(this.state.formData, 'login');

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
            if (!response.payload.loginSuccess) {
                this.setState({
                    formError: true,
                });

                return;
            }
            this.props.history.push('/user/dashboard');
        });
    };

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.state.formError ? (
                        <div className="error_label">
                            Please check your data
                        </div>
                    ) : null}

                    <button
                        className="link-default link-default--login"
                        onClick={(event) => this.submitForm(event)}
                    >
                        Log in
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(Login));
