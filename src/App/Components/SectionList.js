import React, {Component} from 'react';
import "../../CSS/Screens.css"

export class SectionList extends Component {
    render() {
        return(
            <div className="section-container">
                {this.props.values.map((value) => {
                    return(
                        <div className="col">
                            <div className="section">
                                <h5>{value[0]}</h5>
                                <h6><i className="material-icons">{value[1]}</i>{value[2]}</h6>
                            </div>
                            <div className="divider"/>
                        </div>
                    );
                })}
            </div>
        );
    }
}