import * as React from 'react';
import { ReactNode } from 'react';
import './SectionLoader.css';
import paragraph from './short-paragraph.png';

import { Alert, Button } from '@patternfly/react-core';
import { RebootingIcon } from '@patternfly/react-icons';

interface LoaderProps {
  loading: boolean;
  error?: string;
  children?: ReactNode;
  reload?(): void;
}

const SectionLoader = (props: LoaderProps) => (
  <div className="section-loader-wrapper">
    {!props.loading && props.error && (
      <Alert variant="danger"
             action={props.reload && (<Button variant="secondary" onClick={props.reload}><RebootingIcon />Reload</Button>)}
      >
        Holy guacamole... something weird happened, please reload the page to try again.
      </Alert>
    )}
    {props.loading && (
      <div className="section-loader">
        <img src={paragraph} />
        <div className={'loader-inner'}>
          <div className="bar">
            <div className="circle"/>
            <p>Loading</p>
          </div>
        </div>
      </div>
    )}
    {!props.error && !props.loading && props.children}
  </div>
);

export default SectionLoader;