import React from "react";
import  HttpClient  from "../../api/http-client";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
            <h2>Profile</h2>
            <br></br>
            This is a private Profile 
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { Profile };
