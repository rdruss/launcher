import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../states';
import { authenticationAction } from '../../actions/authenticationActions';
import { Button, EmptyState } from 'patternfly-react';
import MainLayoutContainer from '@app/redux/containers/MainLayoutContainer';

interface LoginPageProps {
  login: () => {};
}

const LoginPage = (props: LoginPageProps) => (
  <MainLayoutContainer>
    <EmptyState>
      <EmptyState.Icon/>
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

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(authenticationAction.login()),
});

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

export default LoginPageContainer;
