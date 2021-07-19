import React from "react";
import  HttpClient  from "../../api/http-client";

class Home extends React.Component {
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
            <h3 className="grey-text text-darken-3 important-title">Recently Added</h3>
              <div className="card">
                <p>Hi, I'm a recipe lol</p>
              </div>
            <h3 className="grey-text text-darken-3 important-title">Popular Recipes</h3>
            <h3 className="grey-text text-darken-3 important-title">From Saguira's Kitchen</h3>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { Home };
