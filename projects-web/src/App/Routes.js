// React
import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';

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
    render(){
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Seedy-FIUBA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/projects">Projects</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
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
