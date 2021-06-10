import React, { Component } from 'react';
import axios from 'axios';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
const URL = getSetting('BACKEND_URL')+'/projects';

class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
        this.redirect = this.redirect.bind(this);
    }

    getProjects(){
        axios.get(URL)
            .then(response => {
                if(response.status === 200){
                    response.data.map((project) => {
                        delete project['description'];
                        delete project['hashtags'];
                        delete project['description'];
                        return 0;
                    })
                    this.setState({projects : response.data});
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

    redirect(project) {
        window.location.replace("/projects/"+project.id);
    }

    render() {
        const items = ['ID', 'Name', 'Type', 'End Date', 'Goal', 'Location']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Projects Table
                </div>
                <div className="scroll-card">
                    <Table items={items} values={this.state.projects} redirect={this.redirect}/>
                </div>
            </div>
        );
    }
}

export default ProjectsList;