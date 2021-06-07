import React, { Component } from 'react';
import axios from 'axios';
import {ProjectListCard} from "../../Components/ProjectListCard";
import {getSetting} from "../../settings";
import {SectionList} from "../../Components/SectionList";
const URL = getSetting('BACKEND_URL')+'/projects';

class Profile extends Component {
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
        /*
        const items = [
            ["Name","class", this.state.user.name],
            ["Last Name","attach_money", this.state.user.lastName],
            ["End Date","date_range", this.state.project.endDate],
            ["Location","location_city", this.state.project.location]
        ];
        */
        return (
            <div className="container">
                <div className="row">
                    <div className="col section-container">
                        <div className="card-image">
                            <img src={require('../../seedyfiuba-logo.png')} alt="default logo" className="image image-border"/>
                        </div>
                    </div>
                    <div className="col section-container">
                        {this.state.projects.map((project) => {
                            return (
                                <ProjectListCard title={project.name} text={project.description} redirectLink={'/projects/'+project.id}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
