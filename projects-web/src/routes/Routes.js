import React, { Component } from 'react';
import axios from 'axios';


class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyectos: []
        };
    }

    getProjects(){
        axios.get('http://localhost:5000/projects')
            .then(respuesta => respuesta.data)
            .then((data) => {
                alert(data)
                this.setState({proyectos : data})
            });
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div>
                Proyectos:
                {this.state.proyectos}
                End.
            </div>
        )
    }
}

export default Routes;
