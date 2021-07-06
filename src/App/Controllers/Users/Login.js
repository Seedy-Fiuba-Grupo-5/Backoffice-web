import React, { Component } from 'react';
import {LoginCard} from "../../Components/LoginCard";
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
const LOCAL_URL_USERS = getSetting('BACKEND_URL') + '/admins/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: '',
            showSnackbar: false
        };
        this.login = this.login.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    errorHandler(err) {
        if(err.response){
            this.setState({loading: false});
            this.setState({showSnackbar: true});
            this.setState({error: err.response.status+ ': ' + err.response.data['status']});
        }
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({error: ''});
            this.setState({loading: false});
            this.setState({showSnackbar: true});
            localStorage.setItem("adminId", response.data.id);
            window.location.href = "/home";
        }
    }

    login(){
        this.setState({loading: true})
        const newSession = {
            'email': this.state.email,
            'password': this.state.password
        }
        ApiController.post(LOCAL_URL_USERS, newSession, this.errorHandler, this.responseHandler)
    }

    render() {
        return (
            <div className="container">
                <LoginCard updateStates={this.updateStates} login={this.login} loading={this.state.loading}/>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Login Successful"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        );
    }
}

export default Login;