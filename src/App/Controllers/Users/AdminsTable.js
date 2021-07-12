import React, { Component } from 'react';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
const LOCAL_URL_USERS =  getSetting('BACKEND_URL')+'/admins';

class AdminsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            error: '',
            loading: false,
            showSnackbar: false
        };
        this.redirect = this.redirect.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
    }

    responseHandler(response) {
        this.setState({admins : response.data});
        this.setState({error: ''});
        this.setState({showSnackbar : true});
        this.setState({loading : false});
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    getAdmins(){
        this.setState({loading : true});
        ApiController.get(LOCAL_URL_USERS, this.errorHandler, this.responseHandler);
    }

    redirect(admin){
        this.props.history.push("/admins/"+admin.id);
    }

    componentDidMount() {
        this.getAdmins();
    }

    render() {
        const items = ['ID', 'Name', 'Last Name', 'E-mail']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    System Administrators Table
                    <a className="btn-floating btn-large waves-effect waves-light"
                       style={{backgroundColor: "#4b1e4d", float: "right"}}
                        href={"/admins/new"}
                    ><i
                        className="material-icons">add</i></a>
                </div>
                <div className="scroll-card">
                    <Table items={items} values={this.state.admins} redirect={this.redirect} loading={this.state.loading}/>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "Admins loaded successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

export default AdminsTable;