import React from "react";

// This component lets us use a bootstrap input element without worrying about class names
// or manually wrapping the input with a form-group div
// All of the props passed to this component are spread onto the input element
const Input = props => (
  <div className="form-group ">
    <label htmlFor={props.id}>{props.text} {props.warning}</label>
    <input className="form-control form-control-sm" type="text" {...props} />
  </div>
);

export default Input;
