import React, { Component } from 'react';
import axios from 'axios';
import {ProjectListCard} from "../../Components/ProjectListCard";
import {getSetting} from "../../settings";
import {SectionList} from "../../Components/SectionList";
import {Messagebar} from "../../Components/Messagebar";
import LinearProgress from '@material-ui/core/LinearProgress';
const URL = getSetting('BACKEND_URL')+'/users/';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            user: "",
            loadingProjects: false,
            loadingUser: false,
            error: '',
            showSnackbar: false
        };
    }

    getProjects(){
        this.setState({loadingProjects: true})
        axios.get(URL+this.props.match.params.id+'/projects')
            .then(response => {
                if(response.status === 200){
                    this.setState({projects : response.data});
                    this.setState({error: ''});
                    this.setState({loadingProjects: false});
                    this.setState({showSnackbar: true});
                }
            }).catch((err) => {
                if(err.response){
                    this.setState({loadingProjects: false});
                    this.setState({showSnackbar: true});
                    this.setState({error: err.response.status+ ': ' + err.response.data['status']});
                }
            });
    }

    getUser(){
        this.setState({loadingUser: true})
        axios.get(URL+this.props.match.params.id)
            .then(response => {
                if(response.status === 200){
                    if(response.data.active) {
                        response.data.active = 'Active'
                    } else {
                        response.data.active = 'Inactive'
                    }
                    this.setState({user : response.data});
                    this.setState({error: ''});
                    this.setState({loadingUser: false});
                    this.setState({showSnackbar: true});
                }
            }).catch((err) => {
            if(err.response){
                this.setState({loadingUser: false});
                this.setState({showSnackbar: true});
                this.setState({error: err.response.status+ ': ' + err.response.data['status']});
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
                {this.state.loadingUser ?
                    <LinearProgress /> : null
                }
                <div className="row">
                    <div className="col section-container">
                        <div className="card scroll-card" style={{marginTop:"10vh"}}>
                            {this.state.loadingProjects ?
                                <LinearProgress /> :
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
                            }
                        </div>
                    </div>
                    <div className="col" style={{marginTop: "10vh"}}>
                        <SectionList values={items}/>
                    </div>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "Profile loaded Successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>

            </div>
        );
    }
}

export default Profile;
