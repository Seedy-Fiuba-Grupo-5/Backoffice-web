import React, { Component } from 'react';
import {ProjectListCard} from "../../Components/ProjectListCard";
import {getSetting} from "../../settings";
import {SectionList} from "../../Components/SectionList";
import {Messagebar} from "../../Components/Messagebar";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { PieChart, Pie, Cell } from 'recharts';
import ApiController from "../ApiController";
import ReportGenerator from "../ReportGenerator";
const URL = getSetting('BACKEND_URL')+'/users/';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            user: "",
            loadingProjects: false,
            loadingUser: false,
            error: '',
            showSnackbar: false,
            typeReport: []
        };
        this.projectResponseHandler = this.projectResponseHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.userResponseHandler = this.userResponseHandler.bind(this);
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }

    projectResponseHandler(response) {
        if(response.status === 200 && this.state.error.length === 0){
            this.setState({projects : response.data});
            this.generateReport();
            this.setState({loadingProjects: false});
            this.setState({showSnackbar: true});
        }
    }

    errorHandler(err) {
        if(err.response){
            this.setState({loadingUser: false});
            this.setState({showSnackbar: true});
            this.setState({error: err.response.status+ ': ' + err.response.data['status']});
        }
    }

    userResponseHandler(response) {
        if(response.status === 200){
            if(response.data.active) {
                response.data.active = 'Active'
            } else {
                response.data.active = 'Blocked'
            }
            this.setState({user : response.data});
            this.setState({loadingUser: false});
            this.setState({showSnackbar: true});
        }
    }

    getProjects(){
        this.setState({loadingProjects: true});
        ApiController.get(URL+this.props.match.params.id+'/projects', this.errorHandler, this.projectResponseHandler)
    }

    getUser(){
        this.setState({loadingUser: true});
        ApiController.get(URL+this.props.match.params.id, this.errorHandler, this.userResponseHandler);
    }

    generateReport(){
        let arr = ReportGenerator.createTypeReport(this.state.projects);
        let aux = [];
        for(let i = 0; i < arr.length; i++){
            if ( arr[i].count > 0) {
                aux.push(arr[i]);
            }
        }
        this.setState({typeReport: aux});
    }

    blockUser(){
        const body = {"id_admin": parseInt(localStorage.getItem("adminId"), 10)}
        this.setState({showSnackbar: false});
        ApiController.patch(getSetting('BACKEND_URL')+'/admins/users/'+this.props.match.params.id, body,this.errorHandler, this.userResponseHandler);
    }

    componentDidMount() {
        this.getProjects();
        this.getUser();
    }

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {this.state.typeReport[index]['type']}
            </text>
        );
    };

    render() {
        const items = [
            ["Full Name","assignment_ind", this.state.user.name + ' ' + this.state.user.lastName],
            ["E-mail","email", this.state.user.email],
            ["State","nature_people", this.state.user.active]
        ];

        return (
            <div className="container">
                {this.state.loadingUser ?
                    <LinearProgress /> : null
                }
               <div className="row">
                    <div className="col section-container">
                        <div className="card scroll-card" style={{marginTop:"10vh"}}>
                            {this.state.loadingProjects ?
                                <LinearProgress /> :
                                <div className="card-content">
                                    {this.state.projects.length > 0 ? this.state.projects.map((project) => {
                                            return (
                                                <ProjectListCard title={project.name}
                                                                 text={project.description}
                                                                 redirectLink={'/projects/'+project.id}
                                                                 image={project.image}
                                                />
                                            );
                                        }) :
                                        <div className="h1" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%'}}>
                                            This User doesn't have any Projects yet
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col" style={{marginTop: "10vh", width: "50%"}}>
                        <div className="row">
                            <SectionList values={items}/>
                        </div>
                        <div className="row" >
                                {this.state.user.active === 'Active'?
                                    <Button variant="contained" color="secondary" onClick={this.blockUser}>Block User</Button>:
                                    <Button variant="contained" color="primary" onClick={this.blockUser}>Unblock User</Button>
                                }
                        </div>
                        <div className="row">
                            <PieChart width={800} height={400}>
                                <Pie
                                    data={this.state.typeReport}
                                    cx={200}
                                    cy={150}
                                    outerRadius={120}
                                    label={this.renderCustomizedLabel}
                                    labelLine={false}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {this.state.typeReport.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                    {this.state.showSnackbar ?
                        <Messagebar
                            message={this.state.error.length > 0 ? this.state.error : "User loaded Successfully"}
                            type={this.state.error.length > 0 ? "error" : "success"}
                        /> : null
                    }
                </div>

            </div>
        );
    }
}

export default Profile;
