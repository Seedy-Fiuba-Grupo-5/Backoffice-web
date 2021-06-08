import React, { Component } from 'react';
import axios from 'axios';
import {getSetting} from "../../settings";
import {Table} from "../../Components/Table";
const LOCAL_URL_USERS =  getSetting('BACKEND_URL')+'/users';

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.redirect = this.redirect.bind(this);
    }

    getUsers(){
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
                this.setState({users : data})
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
            <Table items={items} values={this.state.users} redirect={this.redirect}/>
        );
    }
}

export default UsersTable;
