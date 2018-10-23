import * as React from 'react';
import { ReactNode } from 'react';
import './SectionLoader.css';
import paragraph from './short-paragraph.png';

import { Alert } from '@patternfly/react-core';

interface LoaderProps {
  loading: boolean;
  error?: string;
  children?: ReactNode;
}

const SectionLoader = (props: LoaderProps) => (
  <div className="section-loader-wrapper">
    {!props.loading && props.error && (
      <Alert variant="danger">Holy guacamole... something weird happened, please reload the page to try again.</Alert>
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