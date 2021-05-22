import React, {Component} from 'react';
import '../../CSS/Card.css';

export class Card extends Component {

    render() {
        return (
            <div className="card medium">
                <div className="card-image">
                    <img src={require('../../App/seedyfiuba-logo.png')} alt="default logo" className="image"/>
                </div>
                <div className="card-content white-text">
                    <span className="card-title">{this.props.title}</span>
                    <p>{this.props.text}</p>
                    <a className="btn-floating" href={this.props.redirectLink}><i
                        className="material-icons">add</i></a>
                </div>
            </div>
        )
    }
}