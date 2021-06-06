import React, { Component } from 'react';
import axios from 'axios';
import {ProjectListCard} from "../../Components/ProjectListCard";
import {getSetting} from "../../settings";
const URL = getSetting('BACKEND_URL')+'/projects';

class UserProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            newProjectName: ""
        };
    }

    getProjects(){
        axios.get(URL)
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
            <div className="container">
                {this.state.projects.map((project) => {
                    return (
                        <ProjectListCard title={project.name} text={project.description} redirectLink={'/projects/'+project.id}/>
                    );
                })}
            </div>
        );
    }
}

export default UserProjectsList;
