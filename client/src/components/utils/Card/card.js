import React, { Component } from 'react';
import MyButton from '../button';

import { connect } from 'react-redux';
import { addToCart } from '../../../actions/user_actions';
import { withRouter } from 'react-router-dom';

import './card.scss';

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

class Card extends Component {
    state = {
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

    renderCardImage(images) {
        if (!images.length) {
            return '/images/image_not_availble.png';
        }

        return images[0].url;
    }

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

    render() {
        const props = this.props;
        const prodId = this.props._id;

        return (
            <div className={`card-item ${props.grid}`}>
                <div
                    onClick={() =>
                        props.history.push(`/product_details/${prodId}`)
                    }
                    className="card-item__image"
                    style={{
                        backgroundImage: `url(${this.renderCardImage(
                            props.images
                        )})`,
                    }}
                ></div>
                <div className="card-item__actions">
                    <div className="card-item__tags">
                        <div className="tag-brand">{props.brand.name}</div>
                        <div className="tag-name">{props.name}</div>
                        <div className="tag-price">$ {props.price}</div>
                    </div>
                    {props.grid ? (
                        <div className="card-item__description">
                            <p>
                                {props.description.length > 250
                                    ? props.description.substring(0, 250) +
                                      ' ...'
                                    : props.description}
                            </p>
                        </div>
                    ) : null}
                    <div className="actions"></div>
                </div>
                <div className="card-item__add">
                    <MyButton
                        type="bag_link"
                        runAction={() => {
                            const { isAuth } = props.user.userData;
                            this.handleClick();

                            if (isAuth) {
                                this.props.dispatch(addToCart(props._id));
                                this.setState({
                                    variant: 'success',
                                    snackMessage: 'Guitar was add to cart',
                                });
                                return;
                            }

                            this.setState({
                                variant: 'error',
                                snackMessage: 'You need to login first',
                            });
                        }}
                    />
                </div>
                {/* Snack */}
                {this.renderSnack()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(Card));
