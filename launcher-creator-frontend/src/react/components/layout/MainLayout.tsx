import * as React from 'react';
import TopNav from './TopNav';
import SectionLoader from './SectionLoader';

interface MainLayoutProps {
  inProgress: boolean;
  authenticated: boolean;
  userName: string;
  logout: () => {};
}

class MainLayout extends React.Component<MainLayoutProps, {}> {

  constructor(props: MainLayoutProps) {
    super(props);
  }

  public render() {
    return (
      <div id="layout-container">
        <TopNav {...this.props}/>
        <SectionLoader loading={this.props.inProgress}>
          {this.props.children}
        </SectionLoader>
    </div>
  );
  }
}

export default MainLayout;