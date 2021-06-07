import React, {Component} from 'react';
import axios from 'axios';
import {getSetting} from "../../settings";
const URL = getSetting('BACKEND_URL') + '/users/';

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    getProfile(){
        axios.get(URL+localStorage.getItem("token"))
            .then(response => {
                if(response.status === 200){
                    this.setState({user : response.data})
                }
            }).catch((err) => {
            if(err.response){
                localStorage.removeItem("token");
                alert(err.response.status+': '+err.response.data);
                window.location.href = "/";
            }
        });
    }

    componentDidMount() {
        if(localStorage.getItem("token")){
            this.getProfile();
        }
    }

    render() {
        return (
            <div>
                <nav style={{background: '#303f9f'}}>
                    <div className="nav-wrapper container" >
                        <a href="/" data-target="slide-out" className="brand-logo">
                            {localStorage.getItem("token") ?
                                <i className="material-icons sidenav-trigger" data-target="slide-out">menu</i> : null}
                            Home
                        </a>
                    </div>
                </nav>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={require('../../Background.jpg')} alt="background"/>
                            </div>
                            <a href={"/users"}><img className="circle" src={require('../../seedyfiuba-logo.png')} alt="profile"/></a>
                            <a href={"/users"}><span className="white-text name">{this.state.user.name+' '+this.state.user.lastName}</span></a>
                            <a href={"/users"}><span className="white-text email">{this.state.user.email}</span></a>
                        </div>
                    </li>
                    <li><a href={"/projects"}><i className="material-icons">perm_media</i>Projects</a></li>
                    <li><a href={"/users"}><i className="material-icons">supervisor_account</i>Users</a></li>
                </ul>
            </div>
        )
    }
}