import React from "react";
import { registerRequest } from "../redux/actions";
import { connect } from "react-redux";
import Style from "./index.module.css";


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        email: "",
        password: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRegister = () => {
    let payload = {
      ...this.state
    }
    this.props.registerRequest(payload);
  };


  render() {
    const { name,
    email,
    password,
    username,
    mobile,
    description, } = this.state;
    return (
      <div className={Style.reg_form_div}>
        <h1>Register with us</h1>
        <input
            name="name"
            value={name}
            placeholder="Name"
            onChange={this.handleChange}
          />
          <input
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input
            name="username"
            value={username}
            placeholder="User Name"
            onChange={this.handleChange}
          />
          <input
            name="mobile"
            value={mobile}
            placeholder="Mobile"
            onChange={this.handleChange}
          />
          <input
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
          />
          <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (payload) => dispatch(registerRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
