import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../components/input";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {},
      focus: ""
    };
  }

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const result = Joi.validate(data, this.schema, options);

    if (!result.error) return null;
    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = input => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);

    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    const focus = input && input.value ? "focused" : "";
    this.setState({ data, errors, focus });
  };

  renderActionButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        style={{ margin: "10px 0" }}
      >
        {label}
      </button>
    );
  }

  renderInputField(name, label, type = "text") {
    const { data, errors, focus } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        focus={focus}
      />
    );
  }

  renderErrorMessage() {
    const { errors } = this.state;
    const output = errors && Object.keys(errors).map(key => errors[key]);
    return (
      errors && (
        <div style={{ "text-align": "center", color: "#ed4956" }}>{output}</div>
      )
    );
  }
}

export default Form;
