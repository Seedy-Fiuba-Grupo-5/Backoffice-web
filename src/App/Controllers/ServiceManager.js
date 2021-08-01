import React, { Component } from 'react';
import {getSetting} from "../settings";
import {Messagebar} from "../Components/Messagebar";
import ApiController from "./ApiController";
import {Table} from "../Components/Table";
const URL_SERVICES = getSetting('BACKEND_URL') + '/services';

class ServiceManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            showSnackbar: false,
            error: '',
            loading: false
        };
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    errorHandler(err){
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({services : response.data});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
            this.setState({error: ''});
        }
    }

    redirect(service) {
        if (service.url === "https://seedy-fiuba-backend-users.herokuapp.com"){
            window.open("https://app.datadoghq.com/dash/host/5126263560?from_ts=1626373168146&to_ts=1626376768146&live=true", "_blank");
        } else if (service.url === "https://seedy-fiuba-backend-projects.herokuapp.com"){
            window.open("https://app.datadoghq.com/dash/host/5147736386?from_ts=1626555657911&to_ts=1626559257911&live=true", "_blank");
        } else if (service.url === "https://seedy-fiuba-backend-payments.herokuapp.com"){
            window.open("https://app.datadoghq.com/dash/host/5148044250?from_ts=1626615523376&to_ts=1626619123376&live=true", "_blank");
        }
    }

    getServices(){
        ApiController.get(URL_SERVICES, this.errorHandler, this.responseHandler);
    }

    componentDidMount() {
        this.getServices();
    }

    render() {
        const items = ['Service', 'URL', 'Status']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Services Table
                </div>
                <div className="scroll-card">
                    <Table items={items} values={this.state.services} redirect={this.redirect} loading={this.state.loading}/>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "Services loaded successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

export default ServiceManager;