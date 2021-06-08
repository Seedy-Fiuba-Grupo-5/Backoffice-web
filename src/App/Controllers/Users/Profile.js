import React, { Component } from 'react';
import axios from 'axios';
import {ProjectListCard} from "../../Components/ProjectListCard";
import {getSetting} from "../../settings";
import {SectionList} from "../../Components/SectionList";
const URL = getSetting('BACKEND_URL')+'/users/';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            user: ""
        };
    }

    getProjects(){
        axios.get(URL+this.props.match.params.id+'/projects')
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

    getUser(){
        axios.get(URL+this.props.match.params.id)
            .then(response => {
                if(response.status === 200){
                    if(response.data.active) {
                        response.data.active = 'Active'
                    } else {
                        response.data.active = 'Inactive'
                    }
                    this.setState({user : response.data})
                }
            }).catch((err) => {
            if(err.response){
                alert(err.response.status+': '+err.response.data)
            }
        });
    }

    componentDidMount() {
        this.getProjects();
        this.getUser();
    }

    render() {
        const items = [
            ["Full Name","assignment_ind", this.state.user.name + ' ' + this.state.user.lastName],
            ["E-mail","email", this.state.user.email],
            ["State","nature_people", this.state.user.active]
        ];

        return (
            <div className="container">
                <div className="row">
                    <div className="col section-container">
                        <div className="card projects-list-card">
                            <div className="card-content">
                                {this.state.projects.length > 0 ? this.state.projects.map((project) => {
                                    return (
                                        <ProjectListCard title={project.name} text={project.description} redirectLink={'/projects/'+project.id}/>
                                    );
                                }) :
                                    <div className="h1" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%'}}>
                                        This User doesn't have any Projects yet
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{marginTop: "10vh"}}>
                        <SectionList values={items}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
