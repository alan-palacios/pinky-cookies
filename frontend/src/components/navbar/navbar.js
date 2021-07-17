import React from "react";
import { Link } from "react-router-dom";
import  HttpClient  from "../../api/http-client";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleLogOut = async (e) => {
    e.preventDefault();
    HttpClient.post(`login/logout`, this.state)
      .then((response) => {
        console.log(response.data);
        if (response.data.user) {
          this.props.globalLogout();
        } else{
          console.log("Logout Error");
        }
      })
      .catch((error) =>{
        console.error(error)
      })
  };

  render() {
    const renderNavbarAuth = () =>{
      if(this.props.isLoggedIn){
        return <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Home">Add Recipe In</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><a onClick={this.handleLogOut} href="/#">Log Out</a></li>
              </ul>
      }else{
        return  <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link to="/Home">Sass</Link></li>
                  <li><Link to="/LogIn">Log In</Link></li>
                  <li><Link to="/SignIn">Sign In</Link></li>
                </ul>
      }
    }
    return (
      <React.Fragment>
          <nav>
            <div className="nav-wrapper">
              <span className="brand-logo"><Link to="/#">Logo</Link></span>
              {renderNavbarAuth()}
            </div>
          </nav>
      </React.Fragment>
    );
  }
}
export { Navbar };
