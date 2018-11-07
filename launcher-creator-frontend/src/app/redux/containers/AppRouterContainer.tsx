import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../states';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPageContainer from '@app/redux/containers/pages/LoginPageContainer';
import WizardPageContainer from '@app/redux/containers/pages/WizardPageContainer';
import HomePageContainer from '@app/redux/containers/pages/HomePageContainer';

class AppRouterProps {
  public readonly authenticated: boolean;
}

const AppRouter = ({authenticated}: AppRouterProps) => {
  if (!authenticated) {
    return (
      <BrowserRouter>
        <Route path="/">
          <Switch>
            <Route path="/home" component={HomePageContainer}/>
            <Route path="/login" component={LoginPageContainer}/>
            <Redirect from="/wizard" to="/login"/>
            <Redirect from="/" to="/home"/>
          </Switch>
        </Route>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Route path="/">
        <Switch>
          <Route exact={true} path="/wizard" component={WizardPageContainer}/>
          <Route path="/home" component={HomePageContainer}/>
          <Redirect from="/" to="/wizard"/>
        </Switch>
      </Route>
    </BrowserRouter>
  );
};


const mapStateToProps = (state: AppState) => ({
  authenticated: state.authentication.authenticated,
});

const mapDispatchToProps = (dispatch) => ({});

const AppRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouter);

export default AppRouterContainer;
