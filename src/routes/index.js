import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import CoreService from 'services/core';

import UserProfilePage from 'pages/UserProfile';
import HomePage from 'pages/Home';
import AuthPage from 'pages/Auth';
import Layout from 'components/Layout';

const coreService = new CoreService();

function PrivateRoute({ children, ...rest }) {
  return <Route {...rest} render={() => (coreService.isAuthenticated() ? children : <Redirect to="/auth" />)} />;
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <Layout>
            <AuthPage />
          </Layout>
        </Route>
        <PrivateRoute exact path="/:username">
          <Layout>
            <UserProfilePage />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Layout>
            <HomePage />
          </Layout>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes;