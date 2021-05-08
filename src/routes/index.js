import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserProfilePage from 'pages/UserProfile';
import HomePage from 'pages/Home';
import Layout from 'components/Layout';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/:username">
          <Layout>
            <UserProfilePage />
          </Layout>
        </Route>
        <Route exact path="/">
          <Layout>
            <HomePage />
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;