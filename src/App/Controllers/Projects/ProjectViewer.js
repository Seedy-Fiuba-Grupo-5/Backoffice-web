import React, { Component } from 'react';
import axios from 'axios';
import "../../../CSS/Text.css";
import "../../../CSS/Images.css";
import "../../../CSS/Buttons.css";
import {SectionList} from "../../Components/SectionList";
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
import LinearProgress from '@material-ui/core/LinearProgress';
const URL = getSetting('BACKEND_URL')+'/projects/';

class ProjectViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            error: '',
            showSnackbar: false,
            loading: false
        };
    }

    getProject(){
        this.setState({loading : true});
        axios.get(URL+this.props.match.params.id)
            .then(response => {
                if(response.status === 200){
                    this.setState({project : response.data});
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
        this.getProject();
    }

    render(){
        const items = [
            ["Type","class", this.state.project.type],
            ["Goal","attach_money", this.state.project.goal],
            ["End Date","date_range", this.state.project.endDate],
            ["Location","location_city", this.state.project.location]
        ];
        return(
            <div className="container">
                {this.state.loading ?
                    <LinearProgress /> : null
                }
                <div className="h1 project-title">
                    {this.state.project.name}
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-image">
                            <img src={require('../../seedyfiuba-logo.jpg')} alt="default logo" className="image image-border"/>
                        </div>
                        <div className="card large card-view">
                            <div className="card-content">
                                <p>{this.state.project.description}</p>
                            </div>
                        </div>
                    </div>
                    <SectionList values={items}/>
                </div>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Project loaded successfully"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        );
    }
}

export default ProjectViewer;