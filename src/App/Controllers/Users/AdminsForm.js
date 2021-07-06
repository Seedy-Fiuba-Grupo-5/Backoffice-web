import React, { Component } from 'react';
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
import CircularProgress from '@material-ui/core/CircularProgress';
const LOCAL_URL_ADMINS =  getSetting('BACKEND_URL')+'/admins';

class AdminsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            error: '',
            loading: false,
            showSnackbar: false
        };
        this.errorHandler = this.errorHandler.bind(this);
        this.getResponseHandler = this.getResponseHandler.bind(this);
        this.postResponseHandler = this.postResponseHandler.bind(this);
        this.updateStates = this.updateStates.bind(this);
        this.createAdmin = this.createAdmin.bind(this);
    }

    getResponseHandler(response) {
        if(response.status === 200){
            this.setState({name : response.data['name']});
            this.setState({lastName : response.data['lastName']});
            this.setState({email : response.data['email']});
            this.setState({error: ''});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        } else {
            this.setState({error: response.status+': An unexpected error occurred'});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    postResponseHandler(response) {
        if(response.status === 201){
            this.setState({error: ''});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        } else {
            this.setState({error: response.status+': An unexpected error occurred'});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    getAdmin(){
        if(!isNaN(this.props.match.params.id)){
            this.setState({loading : true});
            ApiController.get(LOCAL_URL_ADMINS+"/"+this.props.match.params.id, this.errorHandler, this.getResponseHandler);
        }
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    createAdmin(){
        this.setState({loading: true});
        const body = {
            "name": this.state.name,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }
        ApiController.post(LOCAL_URL_ADMINS, body ,this.errorHandler, this.responseHandler);
    }

    componentDidMount() {
        this.getAdmin();
    }

    render() {
        return (
            <div className="container">
                <h2>System Administrator: {this.props.match.params.id}</h2>
                <div className="card-content" style={{marginTop: "100pt"}}>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <p>Name</p>
                                    <input id="name" name="name" type="text" className="form-control" onChange={this.updateStates}
                                           value={this.state.name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <p>Last name</p>
                                    <input id="lastName" name="lastName" type="text" className="validate" onChange={this.updateStates}
                                           value={this.state.lastName}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <p>E-mail</p>
                                    <input id="email" name="email" type="text" className="validate" onChange={this.updateStates}
                                            value={this.state.email}/>
                                </div>
                            </div>
                            {isNaN(this.props.match.params.id) ?
                                <div className="row">
                                    <div className="input-field col s12">
                                        <p>Password</p>
                                        <input id="password" name="password" type="password" className="validate" onChange={this.updateStates}/>
                                    </div>
                                </div> : null
                            }
                        </form>
                        {isNaN(this.props.match.params.id) ?
                            <button className="btn waves-effect waves-light login-button" type="submit" name="action" onClick={this.createAdmin}>
                                <div className="row">
                                    <div className="col">
                                        Create Admin
                                    </div>
                                    <div className="col" style={{width: "30%"}}>
                                        {this.state.loading ? <CircularProgress size={24}/> : <i className="material-icons right">send</i>}
                                    </div>
                                </div>
                            </button> : null
                        }
                    </div>
                </div>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Admin created successfully"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        );
    }
}

export default AdminsForm;