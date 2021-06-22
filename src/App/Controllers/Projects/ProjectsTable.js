import React, { Component } from 'react';
import axios from 'axios';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
const URL = getSetting('BACKEND_URL')+'/projects';

class ProjectsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showSnackbar: false,
            error: ''
        };
        this.redirect = this.redirect.bind(this);
    }

    getProjects(){
        this.setState({loading:true});
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
                    this.setState({showSnackbar : true});
                    this.setState({loading : false});
                    this.setState({error: ''})
                }
            }).catch((err) => {
            if(err.response){
                this.setState({error: err.response.status+': '+err.response.data["status"]});
                this.setState({showSnackbar : true});
                this.setState({loading : false});
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
                    <Table items={items} values={this.state.projects} redirect={this.redirect} loading={this.state.loading}/>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "Projects loaded successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

export default ProjectsTable;