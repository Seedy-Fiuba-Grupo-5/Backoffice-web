// React
import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css"

// Home
import Home from "./Home";

// Projecs
import ProjectsList from "./ProjectsList";
import ProjectEditor from "./ProjectEditor";

// Users
import UsersTab from "./UsersTab.js";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

class Routes extends Component {

    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }

    render(){
        return (
            <div>
                <nav style={{background: '#0464ab'}}>
                    <div className="nav-wrapper container" >
                        <a href="/" data-target="slide-out" className="brand-logo"><i
                            className="material-icons hoverable sidenav-trigger" data-target="slide-out">menu</i>Home</a>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={require('./Background.jpg')} alt="background"/>
                            </div>
                            <a href="/users"><img className="circle" src={require('./seedyfiuba-logo.png')} alt="profile"/></a>
                            <a href="/users"><span className="white-text name">John Doe</span></a>
                            <a href="/users"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><a href="/projects"><i className="material-icons">cloud</i>Projects</a></li>
                </ul>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/projects' component={ProjectsList} />
                    <Route exact path='/projects/:id' component={ProjectEditor} />
                    <Route exact path='/users' component={UsersTab} />
                </Switch>
            </div>
        );
    }
}

export default Routes;
