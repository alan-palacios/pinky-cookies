import React from "react";
import  HttpClient  from "../../api/http-client";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogIn = async (e) => {
    e.preventDefault();
    HttpClient.post(`login/login`, this.state)
      .then((response) => {
        console.log(response.data);
        if (response.data.user) {
          this.props.globalLogin(response.data.user);
        } else{
          console.log("Login Error");
        }
      })
      .catch((error) =>{
        console.error(error)
      })
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <h2>Log In</h2>
            <br></br>
            <form onSubmit={this.handleLogIn} className="col s12">
              <div className="input-field">
                <input
                  type="email"
                  className="validate"
                  placeholder="Email"
                  id="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <br />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="validate"
                  placeholder="Password"
                  id="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <br />
              </div>
              <br />
              <button type="submit" className="btn btn-dark">
                Sign In
              </button>
              <br/>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { LogIn };
