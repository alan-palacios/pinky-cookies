import React from "react";
import './App.css';
import { Navbar } from './components/navbar/navbar';
import Routes from './Routes';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    /*const token = Cookie.get("token") ? Cookie.get("token") : null;
    if (token) {
      this.setState({ "isLoggedIn": true });
    }*/
  }
  globalLogin = (user) => {
    this.setState({ "isLoggedIn": true });
    console.log("Succesfull Login with user: ");
    this.setState({user});
	  console.log(this.state.user);
  }
  globalLogout = () => {
    this.setState({ "isLoggedIn": false });
  }

  render(){
    return (
      <div className="App">
        <Navbar isLoggedIn={this.state.isLoggedIn} globalLogout={this.globalLogout}/>
        <Routes isLoggedIn={this.state.isLoggedIn} globalLogin={this.globalLogin}/>
      </div>
    );
  }

}

export default App;
