import React, { Component } from 'react';
import axios from 'axios';
import "../../../CSS/ProjectView.css";
const URL = 'http://localhost:5000/';

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
                if(response.status === 200){
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
            <div className="container">
                <div className="h1">
                    {this.state.project.name}
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-image">
                            <img src={require('../../seedyfiuba-logo.png')} alt="default logo" className="image"/>
                        </div>
                        <div className="card large card-view">
                            <div className="card-content">
                                <p>{this.state.project.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="divider"/>
                        <div className="section">
                            <h5>{this.state.project.type}</h5>
                        </div>
                        <div className="divider"/>
                        <div className="section">
                            <h5>{this.state.project.goal}</h5>
                        </div>
                        <div className="divider"/>
                        <div className="section">
                            <h5>{this.state.project.endDate}</h5>
                        </div>
                        <div className="divider"/>
                        <div className="section">
                            <h5>{this.state.project.location}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectEditor;