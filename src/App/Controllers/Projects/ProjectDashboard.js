import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiController from "../ApiController";
import {Messagebar} from "../../Components/Messagebar";
import {getSetting} from "../../settings";
const URL = getSetting('BACKEND_URL')+'/projects';

const types = ["Art","Comics","Crafts","Dance","Design","Fashion","Film & Video","Food",
    "Games","Journalism","Music","Photography","Publishing","Technology","Theater","Other"];

export default class ProjectDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            report: [],
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
            let data = [];
            const iterations = types.length;
            for(let i = 0; i < iterations; i++){
                let len = response.data.filter(function(item){
                    return item.type === types[i];
                }).length;
                data.push({type: types[i], count: len});
            }
            this.setState({report : data});
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
                <h5>Amount of Projects by type</h5>
                <ResponsiveContainer width="100%" height="50%">
                    <BarChart
                        width={500}
                        height={300}
                        data={this.state.report}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='count' fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
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
