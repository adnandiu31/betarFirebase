import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavList extends Component {
    render(){
        return (
            <div className="top-nav" style={{ background:'#007bff', position: 'sticky', top: 0, zIndex: 100 }} >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/users" style={{color: 'black'}} className="nav-link">
                            Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product" style={{color: 'black'}} className="nav-link">
                            Product
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/manual-list" style={{color: 'black'}} className="nav-link">
                            Manual List             
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" style={{color: 'black'}} className="nav-link">
                            Trouble Shooting Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/FAQ" style={{color: 'black'}} className="nav-link">
                            FAQ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/discussion-forum" style={{color: 'black'}} className="nav-link">
                            Discussion Forum
                        </Link>
                    </li>           
                </ul>
            </div>
        )
    }
}

export default NavList