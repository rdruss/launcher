import * as React from 'react';
import { ReactNode } from 'react';
import './SectionLoader.css';
import paragraph from '../../assets/img/short-paragraph.png';

import * as Patternfly from 'patternfly-react';

interface LoaderProps {
  loading: boolean;
  error?: string;
  children?: ReactNode;
}

const SectionLoader = (props: LoaderProps) => (
  <div className="section-loader-wrapper">
    {!props.loading && props.error && (
      <Patternfly.Alert type="error">Holy guacamole... something weird happened, please reload the page to try again.</Patternfly.Alert>
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