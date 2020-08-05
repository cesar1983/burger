import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hummm, Delicious!</h1>
      <div style={{ width: '100%', height: '400px', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        <Button clicked={props.handleCancelButtonClick} buttonType="Danger">
          Cancel
        </Button>
        <Button clicked={props.handleContinueButtonClick} buttonType="Success">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
