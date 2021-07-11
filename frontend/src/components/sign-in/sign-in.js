import React from "react";
import  HttpClient  from "../../api/http-client";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleRegister = async (e) => {
    e.preventDefault();
    console.log(this.state);

    HttpClient.post(`users`, this.state)
      .then((response) => {
        console.log(response);
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
            <h2>Sign In</h2>
            <br></br>
            <form onSubmit={this.handleRegister} className="col s12">
              <div className="input-field">
                <input
                  type="text"
                  className="validate"
                  placeholder="Username"
                  id="nombre"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <br />
              </div>
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
              <code>{JSON.stringify(this.state, null, 2)}</code>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { SignIn };
