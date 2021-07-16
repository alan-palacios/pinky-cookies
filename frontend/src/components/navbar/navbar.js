import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <React.Fragment>
          <nav>
            <div className="nav-wrapper">
              <span className="brand-logo"><Link to="/#">Logo</Link></span>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/#">Sass</Link></li>
                <li><Link to="/LogIn">Log In</Link></li>
                <li><Link to="/SignIn">Sign In</Link></li>
              </ul>
            </div>
          </nav>
      </React.Fragment>
    );
  }
}
export { Navbar };
