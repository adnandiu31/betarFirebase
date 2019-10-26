import React, {Component, createRef} from 'react';



class NavList extends Component {
    render(){
        return (
            <div className="top-nav" style={{ background:'#007bff', position: 'sticky', top: 0, zIndex: 100 }} >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/manual-list" >
                            <a style={{color: 'black'}} className="nav-link" >Manual List</a>                
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register">
                        <a style={{color: 'black'}} className="nav-link" >Trouble Shooting Register</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/FAQ">
                        <a style={{color: 'black'}} className="nav-link" >FAQ</a>
                        </Link>
                    </li>   
                    <li className="nav-item">
                        <Link to="/discussion-forum">
                        <a style={{color: 'black'}} className="nav-link" >Discussion Forum</a>
                        </Link>
                    </li>            
                </ul>
            </div>
        )
    }
}

export default NavList