import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/User/index';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user/dashboard" exact component={UserDashboard} />
                <Route path="/register" exact component={Register} />
                <Route path="/register_login" exact component={RegisterLogin} />
            </Switch>
        </Layout>
    );
};

export default Routes;
