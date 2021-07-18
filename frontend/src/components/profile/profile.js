import React from "react";
import  HttpClient  from "../../api/http-client";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: ''
      }
    };
  }
  componentDidMount() {
    HttpClient.get(`users/${this.props.user._id}`)
      .then((response) => {
        this.setState({user: response.data.data});
      })
      .catch((error) =>{
        console.error(error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <h2>Profile</h2>
            <br></br>
            This is a private Profile 
            <br/>
            <span>{this.state.user?.username}</span>
            <br/>
            <span>{this.state.user?.email}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export { Profile };
