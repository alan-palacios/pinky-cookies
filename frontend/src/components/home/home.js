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
            <h2>Home</h2>
            <br></br>
            This is The Home 
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { Home };
