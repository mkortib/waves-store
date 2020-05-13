import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';

import {
    update,
    generateData,
    isFormValid,
    populateOptionFields,
    resetFields,
} from '../../utils/Form/formActions';
import FormField from '../../utils/Form/formfield';

import { connect } from 'react-redux';
import {
    getBrands,
    getWoods,
    addProduct,
    clearProduct,
} from '../../../actions/products_actions';

import FileUpload from '../../utils/fileupload';

// Material UI Imports
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
};

const styles1 = (theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon
                        className={classNames(
                            classes.icon,
                            classes.iconVariant
                        )}
                    />
                    <span style={{ fontSize: '15px' }}>{message}</span>
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class AddProduct extends Component {
    state = {
        open: false,
        variant: '',
        snackMessage: '',
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your product name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Brand',
                    name: 'brand_input',
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No',
                        },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No',
                        },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        {
                            key: 20,
                            value: 20,
                        },
                        {
                            key: 21,
                            value: 21,
                        },
                        {
                            key: 22,
                            value: 22,
                        },
                        {
                            key: 24,
                            value: 24,
                        },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        {
                            key: true,
                            value: 'Public',
                        },
                        {
                            key: false,
                            value: 'Hidden',
                        },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            images: {
                value: [],
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
        },
    };

    // Snack logic

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

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    componentDidMount() {
        const formData = this.state.formData;

        this.props.dispatch(getBrands()).then((response) => {
            const newFormData = populateOptionFields(
                formData,
                this.props.products.brands,
                'brand'
            );

            this.updateFields(newFormData);
        });

        this.props.dispatch(getWoods()).then((response) => {
            const newFormData = populateOptionFields(
                formData,
                this.props.products.woods,
                'wood'
            );

            this.updateFields(newFormData);
        });
    }

    updateFields(newFormData) {
        this.setState({ formData: newFormData });
    }

    resetFieldsHandler() {
        const newFormData = resetFields(this.state.formData, 'products');

        this.setState({
            formData: newFormData,
            formSuccess: true,
        });

        setTimeout(() => {
            this.setState(
                {
                    formSuccess: false,
                },
                () => this.props.dispatch(clearProduct())
            );
        }, 3000);
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'products');
        let formIsValid = isFormValid(this.state.formData, 'products');

        if (!formIsValid) {
            this.handleClick();

            this.setState({
                formError: true,
                variant: 'error',
                snackMessage: 'Please check your data!',
            });

            return;
        }

        this.props.dispatch(addProduct(dataToSubmit)).then(() => {
            this.handleClick();

            if (!this.props.products.addProduct.success) {
                this.setState({
                    formError: true,
                    variant: 'error',
                    snackMessage: 'Please check your data!',
                });

                return;
            }

            this.setState({
                variant: 'success',
                snackMessage: 'Guitar was add to cart',
            });

            this.resetFieldsHandler();
        });
    }

    updateForm(element) {
        const newFormData = update(element, this.state.formData, 'products');

        this.setState({
            formError: false,
            formData: newFormData,
        });
    }

    imagesHandler(images) {
        const newFormData = {
            ...this.state.formData,
        };

        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({ formData: newFormData });
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1 className="account-add-title">Add product</h1>

                    <form onSubmit={(event) => this.submitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) =>
                                this.imagesHandler(images)
                            }
                            reset={this.state.formSuccess}
                        />

                        <FormField
                            id={'name'}
                            formdata={this.state.formData.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formData.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formData.price}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'brand'}
                            formdata={this.state.formData.brand}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'shipping'}
                            formdata={this.state.formData.shipping}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'available'}
                            formdata={this.state.formData.available}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'wood'}
                            formdata={this.state.formData.wood}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'frets'}
                            formdata={this.state.formData.frets}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'publish'}
                            formdata={this.state.formData.publish}
                            change={(element) => this.updateForm(element)}
                        />

                        {this.state.formError ? (
                            <div className="error_label">
                                Please check your data
                            </div>
                        ) : null}

                        <button
                            className="link-default link-default--user"
                            onClick={(event) => this.submitForm(event)}
                        >
                            Add product
                        </button>
                    </form>
                    {/* Snack */}
                    {this.renderSnack()}
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

export default connect(mapStateToProps, null)(AddProduct);
