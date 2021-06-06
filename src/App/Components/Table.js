import React, {Component} from 'react';
import "../../CSS/Screens.css"

export class Table extends Component {
    render() {
        return(
            <div className="container">
                <table className="responsive-table highlight clickable-row">
                    <thead>
                    <tr>
                        {this.props.items.map((item) => {
                            return(
                                <th>{item}</th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.values.map((value) => {
                            return(
                                <tr>
                                    {Object.values(value).map((key) => {
                                        return(
                                            <td className='clickable-row' onClick={this.props.redirect}>{key}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

/*

 */