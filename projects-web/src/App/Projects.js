import React, { Component } from 'react';
import axios from 'axios';
import {Table, Form, Button} from "react-bootstrap";
const URL = 'http://localhost:5000/'

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            newProjectName: ""
        };
    }

    getProjects(){
        axios.get(URL+'projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                this.setState({projects : data})
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
        axios.post(URL+'projects', newProject);
        this.getProjects();
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <div>
                Proyectos:
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{project.name}</td>
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
        );
    }
}

export default Routes;
