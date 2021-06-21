import React, { Component } from 'react';
import axios from 'axios';
import {LoginCard} from "../../Components/LoginCard";
import {getSetting} from "../../settings";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
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
                    this.setState({error: ''})
                    this.setState({loading: false});
                    this.setState({showSnackbar: true});
                    localStorage.setItem("token", response.data.id);
                    window.location.href = "/home";
                }
            }).catch((err) => {
                if(err.response){
                    this.setState({loading: false})
                    this.setState({showSnackbar: true});
                    this.setState({error: err.response.status+ ': ' + err.response.data['message']})
                }
        });
    }

    render() {
        return (
            <div className="container">
                <LoginCard updateStates={this.updateStates} login={this.login} loading={this.state.loading}/>
                <Snackbar open={this.state.showSnackbar}>
                    {this.state.error.length > 0 ?
                        <Alert severity="error" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.setState({showSnackbar: false})
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            {this.state.error}
                        </Alert> :
                        <Alert severity="success">
                            Login successful!
                        </Alert>
                    }
                </Snackbar>
            </div>
        );
    }
}

export default Login;