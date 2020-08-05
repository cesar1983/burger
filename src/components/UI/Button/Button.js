import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
  let appliedClasses = [classes.Button, classes[props.buttonType]];

  return (
    <button
      className={appliedClasses.join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default button;
