import React, { Component } from 'react';
import ApiController from "../ApiController";
import {Messagebar} from "../../Components/Messagebar";
import {getSetting} from "../../settings";
import {ProjectsByType} from "../../Components/Graphs/ProjectsByType";
const URL = getSetting('BACKEND_URL')+'/projects';

export default class ProjectDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showSnackbar: false,
            error: ''
        };
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.getProjects = this.getProjects.bind(this);
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({projects : response.data});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
            this.setState({error: ''});

        }
    }

    getProjects(){
        this.setState({projects: []});
        ApiController.get(URL, this.errorHandler, this.responseHandler);
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div className="container" style={{width: "100%", height:"100%"}}>
                <h5>Amount of Projects by type </h5>
                <ProjectsByType projects={this.state.projects}/>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Projects loaded successfully"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        );
    }
}
