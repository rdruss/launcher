import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPageContainer from '../containers/pages/LoginPageContainer';
import WizardPageContainer from '../containers/pages/WizardPageContainer';

class AppRouterProps {
  public readonly authenticated: boolean;
}

const AppRouter = ({ authenticated }: AppRouterProps) => {
  if (!authenticated) {
    return (
      <BrowserRouter>
        <Route path="/">
          <Switch>
            <Route path="/login" component={LoginPageContainer} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Route>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Route path="/">
        <Switch>
          <Route exact={true} path="/wizard" component={WizardPageContainer} />
          <Redirect from="/" to="/wizard" />
        </Switch>
      </Route>
    </BrowserRouter>
  );
};

export default AppRouter;