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
                  <li>
                    <form>
                      <div class="input-field">
                        <input id="search" type="search" required/>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                      </div>
                    </form>
                  </li>
                  <li><a href="#!" className="grey-text text-darken-3">Profile</a></li>
                  <li className="divider"></li>
                  <li><a href="#!" className="grey-text text-darken-3">Log Out</a></li>
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
                  <li>
                  <form>
                    <div class="input-field">
                      <div class="row">
                        <div class="input-field black-text">
                          <i class="grey-text text-lighten-2 material-icons prefix">search</i>
                          <input type="search" class="grey-text text-darken-3"/>
                          </div>
                        </div>
                    </div>
                  </form>
                  </li>
                  <li><Link to="/Home" className="grey-text text-darken-3">Home</Link></li>
                  <li><Link to="/LogIn" className="grey-text text-darken-3">Log In</Link></li>
                  <li><Link to="/SignIn" className="grey-text text-darken-3">Sign Up</Link></li>
                  <li><Link/></li>
                </ul>
      }
    }
    return (
      <React.Fragment>
          <nav className="no-shadows">
            <div className="nav-wrapper white">
              <Link to="/Home" className="grey-text text-darken-3 brand-logo pinky-cookies-logo">Pinky Cookies</Link>
              {renderNavbarAuth()}
            </div>
          </nav>
          <div className="solid"/>
      </React.Fragment>
    );
  }
}
export { Navbar };
