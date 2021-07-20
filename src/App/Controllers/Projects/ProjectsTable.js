import React, { Component } from 'react';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ApiController from "../ApiController";
const URL = getSetting('BACKEND_URL')+'/projects';

class ProjectsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showSnackbar: false,
            error: '',
            goalFilter: [0, 50000],
            typeFilter: '',
            name: '',
            metrics: {}
        };
        this.redirect = this.redirect.bind(this);
        this.handleGoalSliderChange = this.handleGoalSliderChange.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.onChange = this.onChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.metricsResponseHandler = this.metricsResponseHandler.bind(this);
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
            response.data.map((project) => {
                delete project['description'];
                delete project['hashtags'];
                delete project['image'];
                return 0;
            })
            this.setState({projects : response.data});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
            this.setState({error: ''})
        }
    }

    metricsResponseHandler(response){
        if(response.status === 200){
            this.setState({metrics : response.data});
        }
    }

    getProjects(){
        this.setState({projects: []});
        this.setState({loading:true});
        const params = {
            type: this.state.typeFilter,
            maxGoal: Math.max.apply(null, this.state.goalFilter),
            minGoal: Math.min.apply(null, this.state.goalFilter),
            name: this.state.name
        };
        ApiController.get(URL, this.errorHandler, this.responseHandler, params);
    }

    getMetrics(){
        ApiController.get(URL+'/metrics', this.errorHandler, this.metricsResponseHandler);
    }

    componentDidMount() {
        this.getProjects();
        this.getMetrics();
    }

    redirect(project) {
        this.props.history.push("/projects/"+project.id);
    }

    handleGoalSliderChange = (event, newValue) => {
        event.preventDefault();
        this.setState({goalFilter: newValue});
    };

    onChange(event){
        this.setState({typeFilter: event.target.value});
    }

    nameChange(event){
        this.setState({name: event.target.value});
    }

    render() {
        const items = ['ID', 'Name', 'Type', 'Goal', 'End Date', 'Location']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Projects Table
                </div>
                <div className="row">
                    <div className="col">
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
                    <div className="col">
                        <div className="card filter-card">
                            <div className="input-field">
                                <select value={this.state.typeFilter} onChange={this.onChange}>
                                    <option value="">Project Type</option>
                                    <option value="Art">Art</option>
                                    <option value="Comics">Comics</option>
                                    <option value="Crafts">Crafts</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Crafts">Crafts</option>
                                    <option value="Design">Design</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Film & Video">Film & Video</option>
                                    <option value="Food">Food</option>
                                    <option value="Games">Games</option>
                                    <option value="Journalism">Journalism</option>
                                    <option value="Music">Music</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Publishing">Publishing</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Theater">Theater</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <Typography id="range-slider" gutterBottom>
                                    Goal range
                                </Typography>
                                <Slider
                                    value={this.state.goalFilter}
                                    onChange={this.handleGoalSliderChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    max="50000"
                                />
                                <input
                                    placeholder="Name"
                                    id="first_name"
                                    type="text"
                                    className="validate"
                                    value={this.state.name}
                                    onChange={this.nameChange}
                                />
                            </div>
                            <button className="btn waves-effect waves-light login-button" type="submit" name="action" onClick={this.getProjects}>
                                Filter
                            </button>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Most Popular Project Type: {this.state.metrics['most_popular_type']}</span>
                            </div>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Average Project Goal: {this.state.metrics['avg_goal']}</span>
                            </div>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Average Project Duration: {this.state.metrics['avg_duration']}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectsTable;