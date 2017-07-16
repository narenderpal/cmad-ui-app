import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (this.props.formType !== nextProps.formType) {
      this.props.clearErrors();
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user);
  }

  redirect() {
    this.props.router.push(`/signed/up`);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const formFilled = !Object.values(this.state).includes("");
    return (
      <div className="form-column-left">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={this.handleChange} />
          </div>
          <div className="names-row">
            <div className="form-row half left">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange} />
            </div>
            <div className="form-row half">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              onChange={this.handleChange} />
          </div>
          <input
            className={formFilled ? "active-button" : "inactive-button"}
            type="submit"
            value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default UserForm;
