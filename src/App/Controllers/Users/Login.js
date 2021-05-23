import React, { Component } from 'react';
import axios from 'axios';
import {LoginCard} from "../../Components/LoginCard";
const LOCAL_URL_USERS = 'http://localhost:5001/users'

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
        alert(newSession.email + newSession.password);
        localStorage.setItem("token", 2);
        /*
        axios.post(LOCAL_URL_USERS, newSession)
            .then(response => {
                if(response.status === 200){
                    alert(response.data);
                    localStorage.setItem("token", response.data);
                } else {
                    alert(response.data);
                }
            });*/
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