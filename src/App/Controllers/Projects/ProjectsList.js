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
    }

    getProjects(){
        axios.get(URL)
            .then(response => {
                if(response.status === 200){
                    response.data.map((project) => {
                        delete project['description'];
                        delete project['hashtags'];
                        delete project['description'];
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

    redirect() {
        alert('Hola')
    }

    render() {
        const items = ['ID', 'Name', 'Type', 'End Date', 'Goal', 'Location']
        return (
            <Table items={items} values={this.state.projects}/>
        );
    }
}

export default ProjectsList;