import React, { Component } from 'react';
import axios from 'axios';
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
        axios.post(URL, newSession)
            .then(response => {
                if(response.status === 200){
                    alert(response.data);
                    localStorage.setItem("token", response.data);
                } else {
                    alert(response.data);
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div className="card medium card-login">
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="text" className="validate" onChange={this.updateStates}/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" className="validate" onChange={this.updateStates}/>
                                        <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.login}>
                        Login<i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
