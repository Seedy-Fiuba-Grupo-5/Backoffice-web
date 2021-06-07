import React, {Component} from 'react';
import "../../CSS/Screens.css"

export class Table extends Component {

    render() {
        return(
            <div className="container">
                <table className="responsive-table highlight">
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
                                <tr onClick={()=>this.props.redirect(value)} style={{cursor: "pointer"}}>
                                    {Object.values(value).map((key) => {
                                        return(
                                            <td>{key}</td>
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