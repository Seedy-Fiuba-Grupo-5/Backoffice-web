import React, { Component } from 'react';
import axios from 'axios';
import {Table} from "react-bootstrap";
const LOCAL_URL_USERS = 'http://localhost:5001'

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    getUsers(){
        axios.get(LOCAL_URL_USERS+'/users')
            .then(response => response.data)
            .then((data) => {
                this.setState({users : data})
            });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div>
                Usuarios:
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Last name</th>
                        <th>email</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.active ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UsersTab;
