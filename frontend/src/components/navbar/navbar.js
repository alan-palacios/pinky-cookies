import React from "react";
import { Link } from "react-router-dom";
import  HttpClient  from "../../api/http-client";
import M from 'materialize-css';  

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
  }

  handleLogOut = async (e) => {
    e.preventDefault();
    HttpClient.post(`login/logout`, this.state)
      .then((response) => {
        if (response.status===200) {
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
        return <React.Fragment>
                <ul id="dropdown1" className="dropdown-content">
                  <li><a href="#!">Profile</a></li>
                  <li className="divider"></li>
                  <li><a href="#!">Log Out</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link to="/Home">My Recipes</Link></li>
                  <li><Link to="/Home">Cook Something</Link></li>
                  <li><Link to="/Profile">Profile</Link></li>
                  <li><a onClick={this.handleLogOut} href="/#">Log Out</a></li>
                  <li><a className="dropdown-trigger" href="#!" data-target="dropdown1"><i className="material-icons">account_circle</i></a></li>
                </ul>
              </React.Fragment>
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
              <span className="brand-logo"><Link to="/Home">Logo</Link></span>
              {renderNavbarAuth()}
            </div>
          </nav>
      </React.Fragment>
    );
  }
}
export { Navbar };
