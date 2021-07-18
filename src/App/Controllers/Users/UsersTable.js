import React, { Component } from 'react';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
const LOCAL_URL_USERS =  getSetting('BACKEND_URL')+'/users';

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: '',
            showSnackbar: false,
            loading: false,
            metrics: {}
        };
        this.redirect = this.redirect.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.metricsResponseHandler = this.metricsResponseHandler.bind(this)
    }

    responseHandler(response) {
        response.data.map((user) => {
            if(user.active) {
                user.active = 'True'
            } else {
                user.active = 'False'
            }
            return 0;
        })
        this.setState({users : response.data});
        this.setState({error: ''});
        this.setState({showSnackbar : true});
        this.setState({loading : false});
    }

    metricsResponseHandler(response){
        if(response.status === 200){
            this.setState({metrics : response.data});
        }
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["message"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    getUsers(){
        this.setState({loading : true});
        ApiController.get(LOCAL_URL_USERS, this.errorHandler, this.responseHandler);
    }

    redirect(user){
        this.props.history.push("/users/"+user.id);
    }

    getMetrics(){
        ApiController.get(LOCAL_URL_USERS+"/metrics", this.errorHandler, this.metricsResponseHandler);
    }


    componentDidMount() {
        this.getUsers();
        this.getMetrics();
    }

    render() {
        const items = ['ID', 'Name', 'Last Name', 'E-mail', 'Is Active']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Users Table
                </div>
                <div className="row">
                    <div className="col">
                        <div className="scroll-card">
                            <Table items={items} values={this.state.users} redirect={this.redirect} loading={this.state.loading}/>
                            {this.state.showSnackbar ?
                                <Messagebar
                                    message={this.state.error.length > 0 ? this.state.error : "Users loaded successfully"}
                                    type={this.state.error.length > 0 ? "error" : "success"}
                                /> : null
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Percentage of Users Blocked Users: {this.state.metrics['percentage_blocked']}</span>
                            </div>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Percentage of Users with Projects: {this.state.metrics['percentage_with_project']}</span>
                            </div>
                        </div>
                        <div className="card card-metrics">
                            <div className="card-content white-text">
                                <span className="card-title">Percentage of Users that are Seers: {this.state.metrics['percentage_seer']}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersTable;
