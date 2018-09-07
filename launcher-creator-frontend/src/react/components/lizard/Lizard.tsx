import * as React from 'react';
import './Lizard.css';

const Lizard = (props) => (
    <div className="lizard">
      <ul>
        {props.children}
      </ul>
    </div>
);



export default Lizard;