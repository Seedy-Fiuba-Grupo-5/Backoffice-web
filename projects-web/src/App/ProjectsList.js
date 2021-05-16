import React, { Component } from 'react';
import axios from 'axios';
import {Table, Form, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
const URL = 'http://localhost:5000/'

class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            newProjectName: ""
        };
    }

    getProjects(){
        axios.get(URL+'projects')
            .then(response => {
                if(response.status === 201){
                    this.setState({projects : response.data})
                }
            }).catch((err) => {
                if(err.response){
                    alert(err.response.status+': '+err.response.data)
                }
            });
    }

    componentDidMount() {
        this.getProjects();
    }

    postProject = event =>{
        event.preventDefault();
        const newProject = {
            'name': this.state.newProjectName
        }
        axios.post(URL+'projects', newProject)
            .then(response => {
                if(response.status === 201){
                    this.getProjects();
                }
            });
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <div className="row container">
                {this.state.projects.map((project) => {
                    return (
                        <div className="col s4">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title">{project.name}</span>
                                            <p>I am a very simple card. I am good at containing small bits of information.
                                                I am convenient because I require little markup to use effectively.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ProjectsList;

/*
<div className="container">
                Proyectos:
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project) => {
                            return (
                                <tr>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>
                                        <Button>
                                            <Link to={"/projects/" + project.id} style = {{color:'white'}}>Open</Link>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Form onSubmit={this.postProject}>
                    <Form.Group controlId="formBasicProject">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="newProjectName"
                            onChange={this.updateStates}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
 */