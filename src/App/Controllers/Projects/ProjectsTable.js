import React, { Component } from 'react';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const URL = getSetting('BACKEND_URL')+'/projects';

class ProjectsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            showSnackbar: false,
            error: '',
            minGoal: 0,
            maxGoal: 10000,
            typeFilter: '',
            name: '',
            metrics: {}
        };
        this.redirect = this.redirect.bind(this);
        this.handleMinGoalChange = this.handleMinGoalChange.bind(this);
        this.handleMaxGoalChange = this.handleMaxGoalChange.bind(this);
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
                delete project['video'];
                delete project['path'];
                delete project['seer'];
                delete project['lat'];
                delete project['lon'];
                delete project['rating'];
                delete project['favorites'];
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
            maxGoal: this.state.maxGoal,
            minGoal: this.state.minGoal,
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

    handleMinGoalChange = (event) => {
        event.preventDefault();
        this.setState({minGoal: event.target.value});
    };

    handleMaxGoalChange = (event) => {
        event.preventDefault();
        this.setState({maxGoal: event.target.value});
    };

    onChange(event){
        this.setState({typeFilter: event.target.value});
    }

    nameChange(event){
        this.setState({name: event.target.value});
    }

    render() {
        const items = ['ID', 'Name', 'Type', 'Goal', 'End Date', 'Location', 'Created On']
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
                                <h5>Project Type</h5>
                                <Select value={this.state.typeFilter} onChange={this.onChange} style={{width:'150pt'}}>
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Art">Art</MenuItem>
                                    <MenuItem value="Comics">Comics</MenuItem>
                                    <MenuItem value="Crafts">Crafts</MenuItem>
                                    <MenuItem value="Dance">Dance</MenuItem>
                                    <MenuItem value="Crafts">Crafts</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Fashion">Fashion</MenuItem>
                                    <MenuItem value="Film & Video">Film & Video</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
                                    <MenuItem value="Games">Games</MenuItem>
                                    <MenuItem value="Journalism">Journalism</MenuItem>
                                    <MenuItem value="Music">Music</MenuItem>
                                    <MenuItem value="Photography">Photography</MenuItem>
                                    <MenuItem value="Publishing">Publishing</MenuItem>
                                    <MenuItem value="Technology">Technology</MenuItem>
                                    <MenuItem value="Theater">Theater</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </div>
                            <div className="input-field">
                                <h5>Goal</h5>
                                <div className="row">
                                    <div className="col">
                                        <input
                                            placeholder="Min. Goal"
                                            id="minGoal"
                                            type="number"
                                            className="validate"
                                            value={this.state.minGoal}
                                            onChange={this.handleMinGoalChange}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            placeholder="Max. Goal"
                                            id="maxGoal"
                                            type="number"
                                            className="validate"
                                            value={this.state.maxGoal}
                                            onChange={this.handleMaxGoalChange}
                                        />
                                    </div>
                                </div>
                                <input
                                    placeholder="Name"
                                    id="first_name"
                                    type="text"
                                    className="validate"
                                    value={this.state.name}
                                    onChange={this.nameChange}
                                />
                            </div>
                            <button className="btn waves-effect waves-light" style={{backgroundColor: "#4b1e4d"}} type="submit" name="action" onClick={this.getProjects}>
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
                                <span className="card-title">Average Project Goal: {Math.round(this.state.metrics['avg_goal'] * 100) / 100}</span>
                            </div>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Average Project Duration (Months): {Math.round(this.state.metrics['avg_duration'])}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectsTable;
