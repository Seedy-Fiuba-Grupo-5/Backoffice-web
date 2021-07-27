import React, { Component } from 'react';
import "../../../CSS/Text.css";
import "../../../CSS/Images.css";
import "../../../CSS/Buttons.css";
import {SectionList} from "../../Components/SectionList";
import {getSetting} from "../../settings";
import {Messagebar} from "../../Components/Messagebar";
import LinearProgress from '@material-ui/core/LinearProgress';
import ApiController from "../ApiController";
import Pagination from '@material-ui/lab/Pagination';
const URL = getSetting('BACKEND_URL')+'/projects/';

class ProjectViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            error: '',
            showSnackbar: false,
            loading: false,
            owner: '',
            payments: '',
            showVideo: false
        };
        this.errorHandler = this.errorHandler.bind(this)
        this.responseHandler = this.responseHandler.bind(this)
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({project : response.data});
            this.setState({owner : response.data.user});
            this.setState({payments : response.data.payments});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
            this.setState({error: ''})
        }
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    handleChange = (event, value) => {
        if(value === 1){
            this.setState({showVideo: false});
        } else {
            this.setState({showVideo: true});
        }
    };

    getProject(){
        this.setState({loading : true});
        ApiController.get(URL+this.props.match.params.id, this.errorHandler, this.responseHandler);
    }

    componentDidMount() {
        this.getProject();
    }

    render(){
        const project_items = [
            ["Type","class", this.state.project.type],
            ["Goal","attach_money", this.state.project.goal],
            ["End Date","date_range", this.state.project.endDate],
            ["Created On","date_range", this.state.project.createdOn],
            ["Location","location_city", this.state.project.location],
            ["Seer Id","account_box", this.state.project.seer],
            ["Description","border_color", this.state.project.description]
        ];
        const user_items = [
            ["First Name","account_box", this.state.owner.name],
            ["Last Name","account_box", this.state.owner.lastName],
            ["E-mail","email", this.state.owner.email],
            ["Creation Status","account_balance_wallet", this.state.payments.creationStatus],
            ["Balance","account_balance_wallet", this.state.payments.balance]
        ]

        return(
            <div className="container">
                {this.state.loading ?
                    <LinearProgress /> : null
                }
                <div className="h1 project-title">
                    {this.state.project.name}
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.showVideo ?
                            <video ref="vidRef" src={this.state.project.video}/> : <img src={this.state.project.image} alt="img" />
                        }
                        <Pagination count={2} style={{backgroundColor: "rgba(52, 52, 52, 0)"}} variant="outlined" onChange={this.handleChange}/>
                        <h1>Owner/Payments</h1>
                        <SectionList values={user_items}/>
                    </div>
                    <div className="col">
                        <h1>Project</h1>
                        <SectionList values={project_items}/>
                    </div>
                </div>
                {this.state.showSnackbar ?
                    <Messagebar
                        message={this.state.error.length > 0 ? this.state.error : "Project loaded successfully"}
                        type={this.state.error.length > 0 ? "error" : "success"}
                    /> : null
                }
            </div>
        );
    }
}

export default ProjectViewer;