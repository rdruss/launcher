import * as React from 'react';
import { Button, EmptyState } from 'patternfly-react';
import { TopNav } from './TopNav';
import { SectionLoader } from './SectionLoader';

class MainLayoutProps {
  public readonly inProgress = true;
  public readonly authenticated = false;
  public readonly userName = 'Brian Johnson';
  public readonly logout: () => {};
  public readonly login: () => {};
}

export class MainLayout extends React.Component<MainLayoutProps, {}> {

  constructor(props: MainLayoutProps) {
    super(props);
  }

  public render() {
    return (
      <div id="layout-container">
        <TopNav {...this.props}/>
        <SectionLoader loading={this.props.inProgress}>
          {!this.props.authenticated && (
            <EmptyState>
              <EmptyState.Icon />
            <EmptyState.Title>Welcome on the Launcher Creator</EmptyState.Title>
          <EmptyState.Info>
          To continue, please log into or register an account for free
            with the Red Hat Developer Program.
          </EmptyState.Info>
          <EmptyState.Action>
          <Button bsStyle="primary" bsSize="large" onClick={this.props.login}>
            Sign in
            </Button>
            </EmptyState.Action>
            </EmptyState>
          )}
          {this.props.authenticated && this.props.children}
        </SectionLoader>
    </div>
  );
  }

}