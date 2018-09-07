import * as React from 'react';
import { Spinner, Icon, Masthead, MenuItem } from 'patternfly-react';
import logo from '../../../assets/logo/RHD-logo.svg';
import './TopNav.css';

class TopNavProps {
  public readonly inProgress = true;
  public readonly authenticated = false;
  public readonly userName = 'Brian Johnson';
  public readonly logout: () => {};
}

const TopNav = (props: TopNavProps) => (
  <Masthead
    iconImg={logo}
    title="Launcher Creator"
    href="/"
    navToggle={false}
  >
    <Masthead.Collapse>
      <Spinner loading={props.inProgress}>
        {props.authenticated && (
          <Masthead.Dropdown
            id="app-user-dropdown"
            title={[
              <Icon type="pf" name="user" key="user-icon" />,
              <span className="dropdown-title" key="dropdown-title">
                {props.userName}
            </span>,
            ]}
          >
            <MenuItem onSelect={props.logout}>Logout</MenuItem>
          </Masthead.Dropdown>
        )}
      </Spinner>
    </Masthead.Collapse>
  </Masthead>
);

export default TopNav;