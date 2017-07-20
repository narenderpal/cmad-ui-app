import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (this.props.formType !== nextProps.formType) {
      this.props.clearErrors();
    }
  }

  // handle on click of user/guest login button
  handleSubmit(e) {
    e.preventDefault();
    let user = Object.assign({}, this.state);
    // for guest user
    if (e.target.className === "guest-login-form") {
      user = ({
        //email: "jqp@122",
        //password: "Guest"
        "username":"napal",
        "password":"test123"
      });
    }
    this.props.login(user);
  }

  redirect() {
    this.props.router.push(`/logged/in`);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="form-column-right">
        <h2>Login</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}/>
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}/>
          </div>
            <input
              className={this.state.email ? "active-button" : "inactive-button"}
              type="submit"
              value="Login" />
        </form>
        <div className="guest-login">
          <form className="guest-login-form" onSubmit={this.handleSubmit}>
            <input
              className="active-button"
              type="submit"
              value="Guest" />
          </form>
        </div>
      </div>
    );
  }
}

export default SessionForm;
