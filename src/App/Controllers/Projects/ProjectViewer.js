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
import Rating from '@material-ui/lab/Rating';
import ReactPlayer from 'react-player'
import {Table} from "../../Components/Table";
const URL = getSetting('BACKEND_URL')+'/projects/';
const URL_TRANSACTIONS = getSetting('BACKEND_URL')+'/transactions?toType=project&toPublicId=';

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
            showVideo: false,
            favorites: [],
            transactions: []
        };
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.transactionsResponseHandler = this.transactionsResponseHandler.bind(this);
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({project : response.data});
            this.setState({owner : response.data.user});
            this.setState({payments : response.data.payments});
            this.setState({favorites : response.data.favorites});
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

    transactionsResponseHandler(response) {
        if(response.status === 200){
            response.data.map((transaction) => {
                delete transaction['fromType'];
                delete transaction['toPublicId'];
                delete transaction['toType'];
                delete transaction['transactionType'];
                delete transaction['updatedAt'];
                return 0;
            })
            this.setState({transactions : response.data});
        }
    }

    getProject(){
        this.setState({loading : true});
        ApiController.get(URL_TRANSACTIONS+this.props.match.params.id, this.errorHandler, this.transactionsResponseHandler);
    }

    getTransactions(){
        this.setState({loading : true});
        ApiController.get(URL+this.props.match.params.id, this.errorHandler, this.responseHandler);
    }

    componentDidMount() {
        this.getProject();
        this.getTransactions();
    }

    redirect(){}

    render(){
        const project_items = [
            ["Type","class", this.state.project.type],
            ["End Date","date_range", this.state.project.endDate],
            ["Created On","date_range", this.state.project.createdOn],
            ["Location","location_city", this.state.project.location]
        ];
        const transaction_items = [
            ["Balance","", this.state.payments.balance],
            ["Goal","", this.state.project.goal],
            ["Reviewer Id","", this.state.payments.reviewerPublicId],
            ["State","", this.state.payments.state]
        ];
        const items = ["ID", "Amount", "From Id", "State", "Created at"]
        return(
            <div className="container" >
                {this.state.loading ?
                    <LinearProgress /> : null
                }
                <div className="h1 project-title" >
                    {this.state.project.name}
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.showVideo ?
                            <ReactPlayer url={this.state.project.video} controls = {true}/> : <img src={this.state.project.image} alt="img" />
                        }
                        {this.state.project.video ?
                            <Pagination count={2} style={{backgroundColor: "rgba(52, 52, 52, 0)"}} variant="outlined" onChange={this.handleChange}/> : null
                        }
                        <div className="row">
                            {this.state.project.rating ?
                                <Rating
                                    name="size-large"
                                    size="large"
                                    value={this.state.project.rating}
                                    precision={0.5}
                                    readOnly
                                /> : null
                            }
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Total Favorites: {this.state.favorites.length}</h5>
                            </div>
                            <div className="col">
                                <h5>Total Transactions: {this.state.transactions.length}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <SectionList values={project_items}/>
                    </div>
                </div>
                <div className="row">
                    <h5>Created by: <a href={"/users/" +this.state.owner.id}>{this.state.owner.name} {this.state.owner.lastName}</a></h5>
                </div>
                <div className="row">
                    <h5>{this.state.project.hashtags}</h5>
                </div>
                <div className="row">
                    <h5>Description</h5>
                </div>
                <div className="row">
                    <p>{this.state.project.description}</p>
                </div>
                <h1>Transactions</h1>
                <div className="row">
                    <div className="col">
                        <div className="scroll-card">
                            <Table items={items} values={this.state.transactions} redirect={this.redirect} loading={this.state.loading}/>
                        </div>
                    </div>
                    <div className="col">
                        <SectionList values={transaction_items}/>
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