import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPageContainer from '../redux/containers/pages/LoginPageContainer';
import WizardPageContainer from '../redux/containers/pages/WizardPageContainer';
import FrontPage from './pages/FrontPage';

class AppRouterProps {
  public readonly authenticated: boolean;
}

const AppRouter = ({ authenticated }: AppRouterProps) => {
  if (!authenticated) {
    return (
      <BrowserRouter>
        <Route path="/">
          <Switch>
            <Route path="/index" component={FrontPage} />
            <Route path="/login" component={LoginPageContainer} />
            <Redirect from="/wizard" to="/login" />
            <Redirect from="/" to="/index" />
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
          <Route path="/index" component={FrontPage} />
          <Redirect from="/" to="/wizard" />
        </Switch>
      </Route>
    </BrowserRouter>
  );
};

export default AppRouter;