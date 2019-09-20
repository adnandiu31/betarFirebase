import React, {
  Component,
  Fragment
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AppProvider, {
  Consumer
} from './AppProvider';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

import Navbar from '../components/Navbar';
import Header from '../components/Header';

import FlashMessage from '../components/FlashMessage';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={visibleNavbar: false}
  }

  showNavbar = () => this.setState({visibleNavbar: true})
  onCloseNavbar = () => this.setState({visibleNavbar: false})
  

  render() {
    return (
      <AppProvider>
        <Router>
          <Fragment>
            <Header showNavbar={this.showNavbar}/>
            <Navbar 
              onCloseNavbar={this.onCloseNavbar} 
              visibleNavbar={this.state.visibleNavbar}
            />
            <FlashMessage />
            <Route exact path="/" component={() => 
              <h1 className="content">Welcome, Home!</h1>} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/dashboard" component={() => <Consumer>
              {
                ({ state }) => state.currentUser?
                  <Dashboard user={state.currentUser} /> 
                  :<div style={{display: "flex",  
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "30px"
                  }}>
                    <div 
                      className="alert alert-danger" 
                      role="alert"
                    >
                      <h1 className="alert-heading">Access denied.</h1>
                      <hr/>
                      <p className="mb-0">You are not authorized to access this page.</p>
                    </div>
                  </div>
              }
            </Consumer>} />
            <Route exact path="/signedOut" component={() => 
              <h1 className="content">You're now signed out.</h1>} />
            <Route exact path="/accountCreated" component={() => 
              <h1 className="content">Account created. <Link to="/login">
              Proceed to Dashboard</Link></h1>} />
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;