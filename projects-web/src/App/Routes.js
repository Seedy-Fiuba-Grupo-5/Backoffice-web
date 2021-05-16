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
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={require('./Background.jpg')} alt="background"/>
                            </div>
                            <a href="/users"><img className="circle" src={require('./seedyfiuba-logo.png')} alt="profile image"/></a>
                            <a href="/users"><span className="white-text name">John Doe</span></a>
                            <a href="/users"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><a href="/projects"><i className="material-icons">cloud</i>Projects</a></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                    className="material-icons">menu</i></a>
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
/*

<nav>
                    <div className="nav-wrapper">

                        <a href="/" className="brand-logo"><i className="material-icons">cloud</i>Home</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                            <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                            <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                            <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
                        </ul>
                    </div>
                </nav>
 */