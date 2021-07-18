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
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.setState({ "isLoggedIn": true });
      this.setState({user});
    }
    console.log(user);
  }
  globalLogin = (user) => {
    this.setState({ "isLoggedIn": true });
    console.log("Succesfull Login with user: ");
    this.setState({user});
    localStorage.setItem('user', JSON.stringify(user));
	  console.log(this.state.user);
  }
  globalLogout = () => {
    this.setState({ "isLoggedIn": false });
    localStorage.clear();
  }

  render(){
    return (
      <div className="App">
        <Navbar  globalLogout={this.globalLogout} {...this.state}/>
        <Routes  globalLogin={this.globalLogin} {...this.state}/>
      </div>
    );
  }

}

export default App;
