import React, { Component } from 'react';
import axios from 'axios';
import {LoginCard} from "../../Components/LoginCard";
import {getSetting} from "../../settings";
const LOCAL_URL_USERS = getSetting('BACKEND_URL') + '/users/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    updateStates = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    login = event =>{
        event.preventDefault();
        const newSession = {
            'email': this.state.email,
            'password': this.state.password
        }
        axios.post(LOCAL_URL_USERS, newSession)
            .then(response => {
                if(response.status === 200 && Number.isInteger(response.data.id)){
                    localStorage.setItem("token", response.data.id);
                    window.location.href = "/home";
                }
            }).catch((err) => {
                if(err.response){
                    alert(err.response.status+': '+err.response.data)
                }
        });
    }

    render() {
        return (
            <div className="container">
                <LoginCard updateStates={this.updateStates} login={this.login}/>
            </div>
        );
    }
}

export default Login;