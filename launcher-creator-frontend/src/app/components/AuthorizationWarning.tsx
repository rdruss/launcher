import { Alert, Button, Stack, StackItem } from '@patternfly/react-core';
import { RebootingIcon, UserLockIcon } from '@patternfly/react-icons';
import * as React from 'react';

interface AuthorizationWarningProps {
  name: string;
  authenticationEnabled: boolean;
  openAccountManagement(): void;
  retry(): void;
}

export function AuthorizationWarning(props: AuthorizationWarningProps) {
  return (<Alert variant="warning"
                 action={(
                   <Stack gutter="sm">
                     {props.authenticationEnabled && (
                       <StackItem isMain={false}>
                         <Button variant="secondary" onClick={props.openAccountManagement}><UserLockIcon/>Manage identity</Button>
                       </StackItem>
                     )}
                     <StackItem isMain={false}>
                       <Button variant="secondary" onClick={props.retry}><RebootingIcon/>Retry</Button>
                     </StackItem>
                   </Stack>
                 )}>
    {props.authenticationEnabled ? (
      <React.Fragment>It seems you did not authorize {props.name}. Please manage your repository identity and Retry..</React.Fragment>
    ) : (
      <React.Fragment>Check that {props.name} is setup on your server and Retry..</React.Fragment>
    )}
  </Alert>);
}