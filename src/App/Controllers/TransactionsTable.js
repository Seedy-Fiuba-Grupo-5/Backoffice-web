import React, { Component } from 'react';
import {getSetting} from "../settings";
import {Table} from "../Components/Table";
import {Messagebar} from "../Components/Messagebar";
import ApiController from "./ApiController";
const URL = getSetting('BACKEND_URL')+'/transactions';

class TransactionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            showSnackbar: false,
            error: '',
            typeFilter: '',
            fromType: '',
            toType: ''
        };
        this.redirect = this.redirect.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onFromTypeChange = this.onFromTypeChange.bind(this);
        this.onToTypeChange = this.onToTypeChange.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
    }

    errorHandler(err) {
        if(err.response){
            this.setState({error: err.response.status+': '+err.response.data["status"]});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
        }
    }

    responseHandler(response) {
        if(response.status === 200){
            this.setState({transactions : response.data});
            this.setState({showSnackbar : true});
            this.setState({loading : false});
            this.setState({error: ''})
        }
    }

    getTransactions(){
        this.setState({transactions: []});
        this.setState({loading:true});
        const params = {};
        if(this.state.typeFilter !== ''){
            params['transactionType'] = this.state.typeFilter;
        }
        if(this.state.toType !== ''){
            params['toType'] = this.state.toType;
        }
        if(this.state.fromType !== ''){
            params['fromType'] = this.state.fromType;
        }
        ApiController.get(URL, this.errorHandler, this.responseHandler, params);
    }

    componentDidMount() {
        this.getTransactions();
    }

    redirect(transaction) {}

    onTypeChange(event){
        this.setState({typeFilter: event.target.value});
    }

    onFromTypeChange(event){
        this.setState({fromType: event.target.value});
    }

    onToTypeChange(event){
        this.setState({toType: event.target.value});
    }

    render() {
        const items = ['ID', 'Amount', 'From', 'From type', 'To', 'To type', 'Type', 'State', 'Created at', 'Updated at']
        return (
            <div className="container">
                <div className="h1" style={{marginTop:"20pt"}}>
                    Transactions Table
                </div>
                <div className="row">
                    <div className="col">
                        <div className="scroll-card" style={{width: "600pt"}}>
                            <Table items={items} values={this.state.transactions} redirect={this.redirect} loading={this.state.loading}/>
                            {this.state.showSnackbar ?
                                <Messagebar
                                    message={this.state.error.length > 0 ? this.state.error : "Transactions loaded successfully"}
                                    type={this.state.error.length > 0 ? "error" : "success"}
                                /> : null
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="card filter-card" style={{width: "200pt"}}>
                            <div className="input-field">
                                <select value={this.state.typeFilter} onChange={this.onTypeChange}>
                                    <option value="">Transaction Type</option>
                                    <option value="fund">Fund</option>
                                    <option value="stageCompleted">Stage Completed</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <select value={this.state.fromType} onChange={this.onFromTypeChange}>
                                    <option value="">From Type</option>
                                    <option value="user">User</option>
                                    <option value="project">Project</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <select value={this.state.toType} onChange={this.onToTypeChange}>
                                    <option value="">To Type</option>
                                    <option value="user">User</option>
                                    <option value="project">Project</option>
                                </select>
                            </div>
                            <button className="btn waves-effect waves-light" style={{backgroundColor: "#4b1e4d"}} type="submit" name="action" onClick={this.getTransactions}>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionsTable;