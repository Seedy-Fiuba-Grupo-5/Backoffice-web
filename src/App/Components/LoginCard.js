import React, {Component} from 'react';

export class LoginCard extends Component {
    render() {
        return (
            <div className="card card-login">
                <div className="h3 login-text">
                    <img src={require('../seedyfiuba-logo.png')} alt="default logo" className="image"/>
                    Bienvenido a Seedy-FIUBA
                    <h6>Por favor, ingrese utilizando su email y contraseña.</h6>
                </div>
                <div className="card-content">
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
                    </div>
                    <button className="btn waves-effect waves-light login-button" type="submit" name="action" onClick={this.props.login}>
                        Login<i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        )
    }
}