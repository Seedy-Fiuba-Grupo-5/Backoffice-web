import React, { Component } from 'react';
import axios from 'axios';
import {LoginCard} from "../../Components/LoginCard";
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
const LOCAL_URL_USERS = getSetting('BACKEND_URL') + '/users/login';

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
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    login(){
        this.setState({loading: true})
        const newSession = {
            'email': this.state.email,
            'password': this.state.password
        }
        axios.post(LOCAL_URL_USERS, newSession)
            .then(response => {
                if(response.status === 200 && Number.isInteger(response.data.id)){
                    this.setState({error: ''});
                    this.setState({loading: false});
                    this.setState({showSnackbar: true});
                    localStorage.setItem("token", response.data.id);
                    window.location.href = "/home";
                }
            }).catch((err) => {
                if(err.response){
                    this.setState({loading: false});
                    this.setState({showSnackbar: true});
                    this.setState({error: err.response.status+ ': ' + err.response.data['status']});
                }
        });
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