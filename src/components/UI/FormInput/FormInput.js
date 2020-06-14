import React from "react";

import classes from "./FormInput.module.css";

const formInput = (props) => {
  let inputElement = null;

  // eslint-disable-next-line default-case
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          onChange={props.changed}
        >
          {props.value}
        </textarea>
      );
      break;
    case "select":
      const options = props.elementConfig.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      });

      inputElement = (
        <select className={classes.InputElement} onChange={props.changed}>
          {options}
        </select>
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default formInput;
