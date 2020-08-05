import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsList = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          marginRight: '8px',
          border: '1px #EEE solid',
          padding: '8px 12px',
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredienst: {ingredientsList}</p>
      <p>Price: USD {Number.parseFloat(props.price).toFixed(2)}</p>
    </div>
  );
};

export default order;
