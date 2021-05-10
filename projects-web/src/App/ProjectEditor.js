import React, { Component } from 'react';
import axios from 'axios';
const URL = 'http://localhost:5000/'

class ProjectEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: ''
        };
    }

    getProject(){
        axios.get(URL+'projects/'+this.props.match.params.id)
            .then(response => response.data)
            .then((data) => {
                this.setState({project : data})
            });
    }

    componentDidMount() {
        this.getProject();
    }

    render(){
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', background: 'white'}}>
                Hello + {this.state.project.name}
            </div>
        );
    }
}

export default ProjectEditor;