import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { auth } from '../firebase';
import { Consumer } from './AppProvider';

import { Drawer, Card} from 'antd';


class Navbar extends React.Component{
  handleLogout = context => {
    auth.logout();
    context.destroySession();
    this.props.history.push('/signedOut');
  };

  render(){
    return (
      <Consumer>{({ state, ...context }) => (
        <Drawer
          title={state.currentUser?
            <Card style={{boxShadow: '-1px -3px 5px #00000085',}}>
              <Card.Meta description={state.currentUser.email} />
            </Card>
            :<span style={{
              fontSize: '35px',
              fontFamily: 'Cookie, cursive',
              textShadow: '-1px -3px 5px black',
              color: 'white'
            }}>
              Menu
            </span>
          }
          placement="left"
          closable={false}
          onClose={this.props.onCloseNavbar}
          visible={this.props.visibleNavbar}
        >{
          state.currentUser?
          <>
            <ul className="list-group">
              <Link to="/dashboard">
                <li className="list-group-item">
                  Dashboard
                </li>
              </Link>
            </ul>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
              }}
            >
              <ul style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch'
                }}
                className="list-group list-group-horizontal"
              >
                <li className="list-group-item">
                  <span onClick={() => this.handleLogout(context)}>
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </>:
          <>
            <ul className="list-group">
              <Link to="/"><li className="list-group-item">Home</li></Link>
            </ul>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
              }}
            >
              <ul style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch'
                }}
                className="list-group list-group-horizontal"
              >
                <Link to="/login">
                  <li className="list-group-item">
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="list-group-item">
                    Create Account
                  </li>
                </Link>
              </ul>
            </div>
          </>
        }</Drawer>
      )}</Consumer>
    )
  }
};

export default withRouter(Navbar);
