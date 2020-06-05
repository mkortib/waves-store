import React, { Component } from 'react';
import FormField from '../Form/formfield';
import { updateUserData, clearUpdateUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../utils/snackbar';
import {
    update,
    generateData,
    populateFields,
    isFormValid,
} from '../Form/formActions';

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
        open: false,
        variant: '',
        snackMessage: '',
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    renderSnack = () => (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
        >
            <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant={this.state.variant}
                message={this.state.snackMessage}
            />
        </Snackbar>
    );

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
            this.handleClick();

            this.setState({
                formError: true,
                snackMessage: 'Please check your form data!',
                variant: 'error',
            });

            return;
        }

        this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
            if (this.props.user.updateUser.success) {
                console.log('Yess');
                this.setState(
                    {
                        formSuccess: true,
                        snackMessage: 'Information was update',
                        variant: 'success',
                    },
                    () => {
                        this.handleClick();
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUser());
                            this.setState({
                                formSuccess: false,
                            });
                        }, 3000);
                    }
                );
            }
        });
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
                <div>
                    <FormField
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                </div>
                <div>
                    <button
                        className="link-default link-default--user"
                        onClick={(event) => this.submitForm(event)}
                    >
                        Update Personal info
                    </button>
                </div>
                {/* Snack */}
                {this.renderSnack()}
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
