import React, { Component } from 'react';
import axios from 'axios';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
import {Messagebar} from "../../Components/Messagebar";
const LOCAL_URL_USERS =  getSetting('BACKEND_URL')+'/users';

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: '',

        };
        this.redirect = this.redirect.bind(this);
    }

    getUsers(){
        this.setState({loading : true});
        axios.get(LOCAL_URL_USERS)
            .then(response => response.data)
            .then((data) => {
                data.map((user) => {
                    if(user.active) {
                        user.active = 'True'
                    } else {
                        user.active = 'False'
                    }
                    return 0;
                })
                this.setState({users : data});
                this.setState({error: ''});
                this.setState({showSnackbar : true});
                this.setState({loading : false});
            }).catch((err) => {
            if(err.response){
                this.setState({error: err.response.status+': '+err.response.data["message"]});
                this.setState({showSnackbar : true});
                this.setState({loading : false});
            }
        });
    }

    redirect(user){
        window.location.replace("/users/"+user.id);
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const items = ['ID', 'Name', 'Last Name', 'E-mail', 'Is Active']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Users Table
                </div>
                <div className="scroll-card">
                    <Table items={items} values={this.state.users} redirect={this.redirect} loading={this.state.loading}/>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "Users loaded successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

export default UsersTable;
