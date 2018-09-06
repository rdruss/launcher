import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPageContainer from './pages/LoginPageContainer';
import HomePageContainer from './pages/HomePageContainer';

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
          <Route exact={true} path="/" component={HomePageContainer} />
          <Redirect from="/" to="/" />
        </Switch>
      </Route>
    </BrowserRouter>
  );
};

export default AppRouter;