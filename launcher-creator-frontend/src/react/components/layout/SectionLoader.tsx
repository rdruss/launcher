import * as React from 'react';
import { ReactNode } from 'react';
import './SectionLoader.css';
import paragraph from '../../../assets/img/short-paragraph.png';
class LoaderProps {
  public readonly loading: boolean;
  public readonly children?: ReactNode;
}

const SectionLoader = (props: LoaderProps) => (
  <div className="container">
    <div className="section-loader-wrapper">
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
      {!props.loading && props.children}
    </div>
  </div>
);

export default SectionLoader;