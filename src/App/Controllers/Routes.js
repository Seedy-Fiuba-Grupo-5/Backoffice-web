// React
import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css"
import "../../CSS/Home.css"

// Home
import Home from "./Home";

// Projecs
import ProjectsList from "./Projects/ProjectsList";
import ProjectEditor from "./Projects/ProjectEditor";

// Users
import UsersTab from "./Users/UsersTab.js";
import {NavBar} from "../Components/NavBar";

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
            <div className="mainScreen">
                <NavBar/>
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
