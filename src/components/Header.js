import React from 'react';
import { Consumer } from './AppProvider';

class Header extends React.Component{
    render(){
        return(
            <Consumer>{({ state, ...context }) => (
                // state.currentUser && this.props.role?
                    <nav 
                        style={{backgroundColor: '#02007f'}}
                        className="navbar navbar-dark"
                    >
                         
                        <a 
                            style={{
                                fontSize: '35px',
                                fontFamily: 'Cookie, cursive',
                                textShadow: '-1px -3px 5px black',
                                padding: '0'
                            }} 
                            className="navbar-brand" 
                            href="#"
                        >
                            Demo project
                        </a>
                        <button   
                            onClick={this.props.showNavbar}
                            style={{
                                borderRadius: "50%",
                                height: '40px',
                                width: '40px',
                                boxShadow: '0 0 0px 1px #656060'
                            }}
                        >
                             <span aria-hidden="true">&gt;</span>
                        </button>
                    </nav>
                    // :''
                )
            }</Consumer>
        )
    }
}

export default Header