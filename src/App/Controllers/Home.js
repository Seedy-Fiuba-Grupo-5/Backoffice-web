import React, { Component } from 'react';

class Home extends Component {
    render(){
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', background: 'white'}}>
                <img style={{width: "30%"}} src={require('../seedyfiuba-logo.jpg')} alt="home logo"/>
            </div>
        );
    }
}

export default Home;