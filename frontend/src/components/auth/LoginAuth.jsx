import React, { Component } from "react";
import API from "../../API";
import { FetchUserInfo } from "../../hooks/FetchUserInfo";
import BasicGoogleLogin from "../basicGoogleLogin/BasicGoogleLogin";
import GoogleLoginButton from "../googleLogin/googleLoginButton";
export default class LoginAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 
  handleSubmit =async (event) => {
    event.preventDefault();

    try {
      const { email, password } = this.state;
      const userData = new FormData();

      userData.append("user[email]", email);
      userData.append("user[password]", password);

      API.login(userData).then((res) => {
        console.log(res);
        window.location.href = "/";
      });
    } catch (error) {
      console.log("error");
    }
  };

  

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form className="login_form" onSubmit={this.handleSubmit}>
        <h1>LOG IN</h1>
        <label htmlFor="email">Email</label>
        <input
          data-testid='email'
          type="email"
          name="email"
          onChange={this.handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          data-testid='password'
          type="password"
          name="password"
          onChange={this.handleChange}
          required
        />
        <button data-testid="loginButton" type="submit">Login</button>
        <span style={{color:'white'}} ><br/>or</span>
        {/* <GoogleLoginButton useType='login'/> */}
        <BasicGoogleLogin/>
      </form>
    );
  }
}
