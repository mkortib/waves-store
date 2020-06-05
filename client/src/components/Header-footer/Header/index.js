import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './header.scss';

class Header extends Component {
    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true,
                className: 'header-link',
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true,
                className: 'header-link',
            },
            {
                name: 'Brands',
                linkTo: '/brands',
                public: true,
                className: 'header-link',
            },
            {
                name: 'About Us',
                linkTo: '/about_us',
                public: true,
                className: 'header-link',
            },
            {
                name: 'FAQ',
                linkTo: '/faq',
                public: true,
                className: 'header-link',
            },
            {
                name: 'Find Us',
                linkTo: '/find_us',
                public: true,
                className: 'header-link',
            },
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false,
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false,
                className: 'header-link header-link--user header-link--account',
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true,
                className: 'header-link header-link--user',
            },
            {
                name: 'Log out',
                linkTo: '/user/register_login',
                public: false,
                className: 'header-link header-link--user',
            },
        ],
        drawerOpen: false,
        headerShow: false,
    };

    componentDidMount() {
        window.addEventListener('scroll', () => this.handlScroll());
    }

    logoutHandler() {
        this.props.dispatch(logoutUser()).then((response) => {
            if (response.payload.success) {
                this.props.history.push('/');
            }
        });
    }

    defaultLink(item, i) {
        return item.name === 'Log out' ? (
            <div
                className="header-link header-link--logout"
                key={i}
                onClick={() => this.logoutHandler()}
            >
                {item.name}
            </div>
        ) : (
            <Link className={item.className} to={item.linkTo} key={i}>
                {item.name}
            </Link>
        );
    }

    cartLink(item, i) {
        const user = this.props.user.userData;

        return (
            <div className="header-cart" key={i}>
                <span className="header-cart__counter">
                    {user.cart ? user.cart.length : 0}
                </span>
                <Link className="header-cart__icon" to={item.linkTo}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>
        );
    }

    showLinks(type) {
        let list = [];

        if (this.props.user.userData) {
            type.forEach((item) => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public) {
                        list.push(item);
                    }
                } else {
                    if (item.name !== 'Log in') {
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item, i) => {
            if (item.name !== 'My Cart') {
                return this.defaultLink(item, i);
            }

            return this.cartLink(item, i);
        });
    }

    handlScroll() {
        if (window.scrollY > 100) {
            this.setState({
                headerShow: true,
            });
        } else {
            this.setState({
                headerShow: false,
            });
        }
    }

    //  DRAVER

    toggleDrawer(value) {
        this.setState({
            drawerOpen: value,
        });
    }

    SideDrawer = () => {
        return (
            <Drawer
                anchor="left"
                open={this.state.drawerOpen}
                onClose={() => this.toggleDrawer(false)}
            >
                <div style={{ width: '30rem' }}>
                    <List component="nav">
                        {this.state.page.map((item, i) => (
                            <ListItem className={item.className} button>
                                {this.defaultLink(item, i)}
                            </ListItem>
                        ))}
                        <Divider />
                        {this.showLinks(this.state.user).map((item, i) => {
                            if (item.props.className !== 'header-cart') {
                                return (
                                    <ListItem
                                        key={i}
                                        className={item.className}
                                        button
                                    >
                                        {item}
                                    </ListItem>
                                );
                            }
                        })}
                    </List>
                </div>
            </Drawer>
        );
    };

    render() {
        return (
            <header
                className={`header header--black${
                    this.state.headerShow ? ' header--fixed' : ''
                }`}
            >
                <div className="header__container">
                    <Hidden smUp>
                        <div className="toggle-menu">
                            <CustomButton
                                style={{ margin: '0 0rem 0 0' }}
                                area-label="Menu"
                                color="inherit"
                                onClick={() => this.toggleDrawer(true)}
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    style={{
                                        width: '1.5rem',
                                        height: '1.5rem',
                                    }}
                                />
                            </CustomButton>

                            {this.SideDrawer()}
                        </div>
                    </Hidden>
                    <div className="header__logo-bl">
                        <a href="/" className="logo logo--header">
                            <svg
                                width="57"
                                height="61"
                                viewBox="0 0 57 61"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M48.5712 24.4064C48.5712 29.2192 47.5301 34.544 45.448 40.3808C46.3355 42.2923 47.4789 43.248 48.8784 43.248C48.7077 43.9307 48.1445 44.272 47.1888 44.272C46.2331 44.272 45.3285 43.8112 44.4752 42.8896C43.0757 46.2688 41.4544 48.9995 39.6112 51.0816C37.8021 53.1296 35.8907 54.1536 33.8768 54.1536C31.2485 54.1536 29.3883 52.5152 28.296 49.2384C25.2923 53.1637 22.3739 55.1264 19.5408 55.1264C15.2059 55.1264 13.0384 52.8395 13.0384 48.2656C13.0384 44.8864 14.1819 40.3808 16.4688 34.7488C17.288 32.7008 18.056 30.3968 18.7728 27.8368C19.4896 25.2427 19.848 22.8533 19.848 20.6688C19.848 18.4843 19.2165 16.7264 17.9536 15.3952C16.6907 14.064 14.9499 13.3984 12.7312 13.3984C9.31787 13.3984 6.536 15.1392 4.3856 18.6208C2.71307 21.3856 1.8768 24.304 1.8768 27.376C1.8768 31.2672 3.02027 33.7419 5.3072 34.8C5.98987 35.1072 6.72373 35.2608 7.5088 35.2608C10.1371 35.2608 12.1339 33.7931 13.4992 30.8576C13.5675 30.7211 13.6699 30.6528 13.8064 30.6528C13.9771 30.6187 14.1136 30.6528 14.216 30.7552C14.3525 30.8576 14.3867 30.9771 14.3184 31.1136C13.6699 32.7179 12.7653 34.0149 11.6048 35.0048C10.4443 35.9605 9.07893 36.4384 7.5088 36.4384C4.4368 36.4384 2.35467 34.8853 1.2624 31.7792C0.818667 30.448 0.5968 28.9461 0.5968 27.2736C0.5968 25.6011 0.9552 23.7237 1.672 21.6416C3.0032 17.7163 5.13653 14.9515 8.072 13.3472C9.53973 12.5621 11.0928 12.1696 12.7312 12.1696C15.8715 12.1696 18.2779 13.2448 19.9504 15.3952C21.6229 17.5115 22.4592 20.3275 22.4592 23.8432C22.4592 26.4032 21.9472 29.3728 20.9232 32.752C19.8992 36.1312 18.8752 39.3739 17.8512 42.48C16.8272 45.5861 16.3152 47.9243 16.3152 49.4944C16.3152 51.0645 16.5371 52.1909 16.9808 52.8736C17.4587 53.5221 18.2949 53.8464 19.4896 53.8464C22.1861 53.8464 24.968 51.7643 27.8352 47.6C27.5621 45.7909 27.4256 44.0501 27.4256 42.3776C27.4256 36.9163 28.3472 32.24 30.1904 28.3488C31.5216 25.6181 32.9381 24.2528 34.44 24.2528C35.7712 24.2528 36.4368 25.4304 36.4368 27.7856C36.4368 30.1408 35.8907 32.9739 34.7984 36.2848C33.7061 39.5957 32.2896 42.7531 30.5488 45.7568C30.9584 50.4331 32.2555 52.7712 34.44 52.7712C37.7168 52.7712 40.7547 49.0848 43.5536 41.712C41.9835 39.0837 41.1984 35.3632 41.1984 30.5504C41.1984 27.7173 41.5568 25.1232 42.2736 22.768C43.1611 19.7984 44.424 18.3136 46.0624 18.3136C47.7349 18.3136 48.5712 20.3445 48.5712 24.4064ZM47.24 24.048C47.24 21.3173 46.7792 19.952 45.8576 19.952C45.1749 19.952 44.6288 20.9419 44.2192 22.9216C43.8437 24.8672 43.656 26.5397 43.656 27.9392C43.656 32.4448 43.9973 35.9264 44.68 38.384C46.3867 32.8203 47.24 28.0416 47.24 24.048ZM30.3952 42.736C30.3952 42.9067 30.3952 43.0603 30.3952 43.1968C31.7264 40.6368 32.8357 37.9744 33.7232 35.2096C34.6789 32.2059 35.1568 29.9531 35.1568 28.4512C35.1568 26.9152 34.8325 26.0619 34.184 25.8912C33.2965 25.8912 32.4432 27.7856 31.624 31.5744C30.8048 35.3291 30.3952 39.0496 30.3952 42.736Z"
                                    fill="#FFD32C"
                                />
                                <circle
                                    cx="30"
                                    cy="34"
                                    r="26.5"
                                    stroke="#FFD32C"
                                />
                            </svg>
                            Waves
                        </a>
                    </div>

                    <div className="header__navs">
                        <div className="main-nav">
                            {this.showLinks(this.state.page)}
                        </div>
                        <div className="user-nav">
                            {this.showLinks(this.state.user)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const CustomButton = withStyles({
    root: {
        borderRadius: '50%',
        backgroundColor: '#3A3A3A',
        minWidth: '40px',
        minHeight: '40px',
        maxWidth: '40px',
        maxHeight: '40px',
        '&:hover': {
            backgroundColor: '#3A3A3A',
        },
    },
})(Button);

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, null)(withRouter(Header));
