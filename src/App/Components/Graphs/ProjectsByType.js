import React, {Component} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const types = ["Art","Comics","Crafts","Dance","Design","Fashion","Film & Video","Food",
    "Games","Journalism","Music","Photography","Publishing","Technology","Theater","Other"];

export class ProjectsByType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            report: []
        };
    }

    componentDidUpdate() {
        if(this.state.report.length > 0){
            return;
        }
        let data = [];
        const iterations = types.length;
        for(let i = 0; i < iterations; i++){
            let len = this.props.projects.filter(function(item){
                return item.type === types[i];
            }).length;
            data.push({type: types[i], count: len});
        }
        this.setState({report : data});
    }

    render() {
        return (
            <ResponsiveContainer width="100%" height="50%">
                <BarChart
                    width={500}
                    height={300}
                    data={this.state.report}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='count' fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}