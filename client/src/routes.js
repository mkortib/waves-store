import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import RegisterLogin from './components/RegisterLogin';
import Register from './components/RegisterLogin/register';
import UserDashboard from './components/User/index';
import Auth from './hoc/auth';
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/add-product';
import ManageCategories from './components/User/Admin/manage-categories';
import ProductPage from './components/Product/index';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update-profile';
import ManageSite from './components/User/Admin/manage-site';
import Brands from './components/Brands';
import PageNotFount from './components/404';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                {/* Private */}

                <Route
                    path="/user/dashboard"
                    exact
                    component={Auth(UserDashboard, true)}
                />
                <Route
                    path="/admin/add_product"
                    exact
                    component={Auth(AddProduct, true)}
                />
                <Route
                    path="/admin/manage_categories"
                    exact
                    component={Auth(ManageCategories, true)}
                />
                <Route
                    path="/user/cart"
                    exact
                    component={Auth(UserCart, true)}
                />
                <Route
                    path="/user/user_profile"
                    exact
                    component={Auth(UpdateProfile, true)}
                />
                <Route
                    path="/admin/site_info"
                    exact
                    component={Auth(ManageSite, true)}
                />
                {/* Public */}
                <Route
                    path="/register"
                    exact
                    component={Auth(Register, false)}
                />
                <Route
                    path="/register_login"
                    exact
                    component={Auth(RegisterLogin, false)}
                />
                <Route path="/shop" exact component={Auth(Shop, null)} />
                <Route
                    path="/product_details/:id"
                    exact
                    component={Auth(ProductPage, null)}
                />
                <Route path="/brands" exact component={Auth(Brands, null)} />
                <Route path="/" exact component={Auth(Home, null)} />
                <Route component={Auth(PageNotFount, null)} />
            </Switch>
        </Layout>
    );
};

export default Routes;
