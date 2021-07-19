import React from "react";
import  HttpClient  from "../../api/http-client";

class Footer extends React.Component {
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
        <div>
          <footer class="page-footer red lighten-4">
            <div class="container">
              <div class="row">
                <div class="col l6 s12">
                  <h5 class="white-text">Made by Souless Tyron and SaguiraBlack</h5>
                  <br/>
                </div>
              </div>
            </div>
          </footer>   
        </div>
      </React.Fragment>
    );
  }
}
export { Footer };
