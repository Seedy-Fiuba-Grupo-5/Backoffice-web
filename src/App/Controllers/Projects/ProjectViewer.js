import React, { Component } from 'react';
import axios from 'axios';
import "../../../CSS/Text.css";
import "../../../CSS/Images.css";
import "../../../CSS/Buttons.css";
import {SectionList} from "../../Components/SectionList";
import {getSetting} from "../../settings";
const URL = getSetting('BACKEND_URL')+'/projects/';

class ProjectViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: ''
        };
    }

    getProject(){
        axios.get(URL+this.props.match.params.id)
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
        const items = [
            ["Type","class", this.state.project.type],
            ["Goal","attach_money", this.state.project.goal],
            ["End Date","date_range", this.state.project.endDate],
            ["Location","location_city", this.state.project.location]
        ];
        return(
            <div className="container">
                <div className="h1 project-title">
                    {this.state.project.name}
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-image">
                            <img src={require('../../seedyfiuba-logo.png')} alt="default logo" className="image image-border"/>
                        </div>
                        <div className="card large card-view">
                            <div className="card-content">
                                <p>{this.state.project.description}</p>
                            </div>
                        </div>
                    </div>
                    <SectionList values={items}/>
                </div>
            </div>
        );
    }
}

export default ProjectViewer;