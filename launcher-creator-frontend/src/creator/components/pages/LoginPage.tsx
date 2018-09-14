import * as React from 'react';
import { Button, EmptyState } from 'patternfly-react';
import MainLayoutContainer from '../layout/MainLayoutContainer';

interface LoginPageProps {
  login: () => {};
}

const LoginPage = (props: LoginPageProps) => (
  <MainLayoutContainer>
    <EmptyState>
      <EmptyState.Icon />
      <EmptyState.Title>Welcome on the Launcher Creator</EmptyState.Title>
      <EmptyState.Info>
        To continue, please log into or register an account for free
        with the Red Hat Developer Program.
      </EmptyState.Info>
      <EmptyState.Action>
        <Button bsStyle="primary" bsSize="large" onClick={props.login}>
          Sign in
        </Button>
      </EmptyState.Action>
    </EmptyState>
  </MainLayoutContainer>
);

export default LoginPage;