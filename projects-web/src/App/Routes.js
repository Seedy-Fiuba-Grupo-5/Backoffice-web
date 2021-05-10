import React, {Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import { Switch, Route, Link } from 'react-router-dom';
import ProjectsList from "./Projects";
import Home from "./Home";
import ProjectEditor from "./ProjectEditor";

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
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/projects' component={ProjectsList} />
                    <Route exact path='/projects/:id' component={ProjectEditor} />
                </Switch>
            </div>
        );
    }
}

export default Routes;