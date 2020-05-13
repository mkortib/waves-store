import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';

class ResetUser extends Component {
    state = {
        formError: false,
        formSuccess: false,
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
        },
    };

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'reset_email');
        let formIsValid = isFormValid(this.state.formData, 'reset_email');

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        axios.post('/api/user/reset_user', dataToSubmit).then((response) => {
            if (response.data.success) {
                this.setState({ formSuccess: true });
            } else {
                alert('false');
            }
        });
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'reset_email');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    render() {
        return (
            <div className="cm-container">
                <h1>Reset Password</h1>

                <form onSubmit={(event) => this.submitForm(event)}>
                    <div className="email-field">
                        <FormField
                            id={'email'}
                            formdata={this.state.formData.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>

                    {this.state.formSuccess ? (
                        <div className="form_success">
                            Done, check your email
                        </div>
                    ) : null}

                    {this.state.formError ? (
                        <div className="error_label">
                            Please check your data
                        </div>
                    ) : null}

                    <button
                        onClick={(event) => this.submitForm(event)}
                        className="link-default link-default--register"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        );
    }
}

export default ResetUser;
