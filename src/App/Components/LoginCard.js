import React, {Component} from 'react';
import '../../CSS/Card.css'
import '../../CSS/Images.css'
import CircularProgress from '@material-ui/core/CircularProgress';

export class LoginCard extends Component {

    render() {
        return (
            <div className="card card-login">
                <div className="card-header">
                    <div className="login-text" style={{height: "20vh"}}>
                        <img src={require('../seedyfiuba-logo.jpg')} alt="default logo" className="image" style={{marginTop: "20pt"}}/>
                        <h3>Bienvenido a Seedy-FIUBA</h3>
                        <h6>Por favor, ingrese utilizando su email y contraseña.</h6>
                    </div>
                </div>
                <div className="card-content" style={{marginTop: "100pt"}}>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="text" className="validate" onChange={this.props.updateStates}/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" className="validate" onChange={this.props.updateStates}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </form>
                        <button className="btn waves-effect waves-light login-button" type="submit" name="action" onClick={this.props.login}>
                            <div className="row">
                                <div className="col">
                                    Login
                                </div>
                                <div className="col" style={{width: "30%"}}>
                                    {this.props.loading ? <CircularProgress size={24}/> : <i className="material-icons right">send</i>}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}