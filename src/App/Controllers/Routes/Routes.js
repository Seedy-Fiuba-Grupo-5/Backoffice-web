// React
import React, {Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css"
import "../../../CSS/Screens.css"

// Home
import Home from "../Home";

// Projecs
import Profile from "../Users/Profile";
import ProjectViewer from "../Projects/ProjectViewer";

// Users
import UsersTable from "../Users/UsersTable.js";
import {NavBar} from "./NavBar";
import Login from "../Users/Login";
import {PrivateRoute} from "../../Components/PrivateRoute";
import ProjectsTable from "../Projects/ProjectsTable";
import ProjectDashboard from "../Projects/ProjectDashboard";
import AdminsTable from "../Users/AdminsTable";
import AdminsForm from "../Users/AdminsForm";

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
                    <PrivateRoute exact path='/projects' component={ProjectsTable} />
                    <PrivateRoute exact path='/projects/:id' component={ProjectViewer} />
                    <PrivateRoute exact path='/dashboards' component={ProjectDashboard} />
                    <PrivateRoute exact path='/users' component={UsersTable} />
                    <PrivateRoute exact path='/users/:id' component={Profile} />
                    <PrivateRoute exact path='/admins' component={AdminsTable} />
                    <PrivateRoute exact path='/admins/:id' component={AdminsForm} />
                </Switch>
            </div>
        );
    }
}

export default Routes;
