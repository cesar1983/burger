import React from "react";

import classes from "./FormInput.module.css";

const formInput = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  if (props.touched && props.invalid && props.shouldBeValidated) {
    inputClasses.push(classes.Invalid);
  }

  // eslint-disable-next-line default-case
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
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
        <select className={inputClasses.join(" ")} onChange={props.changed}>
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
