import React, {Component} from 'react';
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
import ApiController from "../ApiController";
const URL = getSetting('BACKEND_URL') + '/users/';

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            error: '',
            showSnackbar: false
        };
        this.responseHandler = this.responseHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({user : response.data});
            this.setState({error: ''});
            this.setState({showSnackbar : false});
        }
    }

    errorHandler(err) {
        if(err.response){
            localStorage.removeItem("token");
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            window.location.href = "/";
        }
    }

    getProfile(){
        ApiController.get(URL+localStorage.getItem("userId"), this.errorHandler, this.responseHandler)
    }

    componentDidMount() {
        if(localStorage.getItem("token")){
            this.getProfile();
        }
    }

    render() {
        return (
            <div>
                <nav style={{background: '#4b1e4d'}}>
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
                            <div className="background" style={{background: '#381242'}}/>
                            <a href={"/users/"+localStorage.getItem("userId")}><img style={{width: "50%"}} src={require('../../seedyfiuba-logo.jpg')} alt="profile"/></a>
                            <span className="white-text name">{this.state.user.name+' '+this.state.user.lastName}</span>
                            <span className="white-text email">{this.state.user.email}</span>
                        </div>
                    </li>
                    <li><a href={"/projects"}><i className="material-icons">perm_media</i>Projects</a></li>
                    <li><a href={"/users"}><i className="material-icons">supervisor_account</i>Users</a></li>
                </ul>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Profile loaded successfully"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        )
    }
}