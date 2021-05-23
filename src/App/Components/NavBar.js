import React, {Component} from 'react';

export class NavBar extends Component {

    render() {
        return (
            <div>
                <nav style={{background: '#303f9f'}}>
                    <div className="nav-wrapper container" >
                        <a href="/" data-target="slide-out" className="brand-logo">
                            {localStorage.getItem("token") ?
                                <i className="material-icons sidenav-trigger" data-target="slide-out">menu</i> : null}
                            Home
                        </a>
                    </div>
                </nav>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={require('../Background.jpg')} alt="background"/>
                            </div>
                            <a href="/users"><img className="circle" src={require('../seedyfiuba-logo.png')} alt="profile"/></a>
                            <a href="/users"><span className="white-text name">John Doe</span></a>
                            <a href="/users"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><a href="/projects"><i className="material-icons">cloud</i>Projects</a></li>
                </ul>
            </div>
        )
    }
}