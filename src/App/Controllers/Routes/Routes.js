// React
import React, {Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css"
import "../../../CSS/Screens.css"

// Home
import Home from "../Home";

// Projecs
import UserProjectsList from "../Users/UserProjectsList";
import ProjectViewer from "../Projects/ProjectViewer";

// Users
import UsersTab from "../Users/UsersTab.js";
import {NavBar} from "./NavBar";
import Login from "../Users/Login";
import {PrivateRoute} from "./PrivateRoute";
import ProjectsList from "../Projects/ProjectsList";

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
                    <Route exact path={"/"} render={props => localStorage.getItem("token") ?
                        <Redirect to={{pathname: "/home"}}/> : <Login/>
                    }/>
                    <PrivateRoute exact path='/home' component={Home} />
                    <PrivateRoute exact path='/projects' component={ProjectsList} />
                    <PrivateRoute exact path='/projects/:id' component={ProjectViewer} />
                    <PrivateRoute exact path='/users' component={UsersTab} />
                </Switch>
            </div>
        );
    }
}

export default Routes;
