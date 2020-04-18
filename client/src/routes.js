import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/User/index';
import Auth from './hoc/auth';
import Shop from './components/Shop';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route
                    path="/user/dashboard"
                    exact
                    component={Auth(UserDashboard, true)}
                />
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
                <Route path="/shop" exact component={Auth(Shop, false)} />
            </Switch>
        </Layout>
    );
};

export default Routes;
