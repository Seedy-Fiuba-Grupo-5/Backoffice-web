import React, { Component } from 'react';
import axios from 'axios';
import {Form, Card} from "react-bootstrap";
const URL = 'http://localhost:5000/'

class ProjectEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: ''
        };
    }

    getProject(){
        axios.get(URL+'projects/'+this.props.match.params.id)
            .then(response => {
                if(response.status === 201){
                    this.setState({project : response.data})
                }
            }).catch((err) => {
                if(err.response){
                    alert(err.response.status+': '+err.response.data)
                }
            });
    }

    componentDidMount() {
        this.getProject();
    }

    render(){
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', background: 'white'}}>
                <Card style={{background: 'grey', width: '40%', height: '40%' }}>
                    <Form>
                        <Form.Group controlId="formProject" style={{width: '40%', height: '40%' }}>
                            <Form.Label>Project</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                value={this.state.project ? this.state.project.name : ''}
                            />
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default ProjectEditor;