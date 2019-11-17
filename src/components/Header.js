import React from 'react';
import { Consumer } from './AppProvider';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component{   

    handleLogout = (event) => {
        localStorage.clear();
        this.props.history.push('/signedOut');
      };

    render(){
        return(
            <Consumer>
                {({ state, ...context }) => (
                    <nav style={{backgroundColor: '#02007f'}} className="navbar navbar-dark" >Bangladesh Betar
                        <button >
                             {
                                    (localStorage.getItem('userRole') == null)?
                                    <Link to="/login">
                                    <li className="list-group-item">
                                        Login
                                    </li>
                                    </Link>
                                    :
                                    <Link to='/signedOut'>
                                        <li className="list-group-item">
                                            <a onClick={this.handleLogout} >Logout</a>
                                        </li>
                                    </Link>
                                }
                        </button>
                    </nav>
                )
            }</Consumer>
        )
    }
}

export default withRouter(Header)

