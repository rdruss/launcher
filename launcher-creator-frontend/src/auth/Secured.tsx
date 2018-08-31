import * as React from 'react';
import {Authentication} from './Authentication';
import {KeycloakAuthentication} from './KeycloakAuthentication';
import {KeycloakConfig} from "./KeycloakConfig";
import {Button} from 'patternfly-react';
import {User} from "./User";


class SecuredState {
    public user?: User
}

export class Secured extends React.Component<any, SecuredState> {
    private auth: Authentication;

    constructor(props) {
        super(props);
        this.auth = new KeycloakAuthentication(new KeycloakConfig());
        this.state = {
            user: undefined
        };
        this.login = this.login.bind(this);
    }

    public componentDidMount() {
        this.auth.init().then(() => {
            this.setState({ user: this.auth.user });
        })
    }

    public login() {
        this.auth.login();
    }

    public render() {
        if (!this.state.user) {
            return (
                <Button button="primary" onClick={this.login}>Login</Button>
            );
        }
        return (
            <div>
                <div>Hey {this.state.user.name}</div>
                {this.props.children}
            </div>

        );

    }

}