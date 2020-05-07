import React, { Component } from 'react';
import FormField from '../../utils/Form/formfield';
import {
    update,
    generateData,
    populateFields,
    isFormValid,
} from '../../utils/Form/formActions';

import { updateUserData, clearUpdateUser } from '../../../actions/user_actions';

import { connect } from 'react-redux';

class UpdatePersonalNfo extends Component {
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
        },
    };

    componentWillMount() {
        const newFormData = populateFields(
            this.state.formData,
            this.props.user.userData
        );

        this.setState({ formData: newFormData });
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'update_user');
        let formIsValid = isFormValid(this.state.formData, 'update_user');

        if (!formIsValid) {
            this.setState({
                formError: true,
            });

            return;
        }

        this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
            if (this.props.user.userData.success) {
                this.setState({ formSuccess: true }, () => {
                    setTimeout(() => {
                        this.props.dispatch(clearUpdateUser());
                        this.setState({ formSuccess: false });
                    }, 3000);
                });
            }
        });

        console.log(dataToSubmit);
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'update_user');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    render() {
        return (
            <form onSubmit={(event) => this.submitForm(event)}>
                <h2 className="update-user-title">Personal information</h2>
                <div className="form-block-two">
                    <div className="block">
                        <FormField
                            id={'name'}
                            formdata={this.state.formData.name}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="block">
                        <FormField
                            id={'lastname'}
                            formdata={this.state.formData.lastname}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                </div>
                <div className="">
                    <FormField
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                </div>
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
                        Update Personal info
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UpdatePersonalNfo);
