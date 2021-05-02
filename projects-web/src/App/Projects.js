import React, { Component } from 'react';
import axios from 'axios';


class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    getProjects(){
        axios.get('http://localhost:5000/projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                this.setState({projects : data})
            });
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div>
                Proyectos:
                {this.state.projects}
                End.
            </div>
        )
    }
}

export default Routes;
