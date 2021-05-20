import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Grid.css';
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
                if(response.status === 200){
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

    render() {
        return (
            <div className="row container">
                {this.state.projects.map((project) => {
                    return (
                        <div className="col-sm-4 s4">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title">{project.name}</span>
                                            <p>I am a very simple card. I am good at containing small bits of information.
                                                I am convenient because I require little markup to use effectively.</p>
                                            <a className="btn-floating btn-large waves-effect waves-light blue" style={{float: "right"}} href={'/projects/'+project.id}><i
                                                className="material-icons">add</i></a>
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
