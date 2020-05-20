import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
import Navi from './components/nav-bar/Navi';
import Upperline from './components/UpperLine';
import Body from './components/Body';
import Footer from './components/Footer'
import NormalPost from './components/normal-post-create/NormalPost';
import AddressFormNP from './components/normal-post-create/AddressFormNP';
import QRCode from './components/QRCode';
import RegisteredPost from './components/registered-post-create/RegisteredPost';
import LogTable from './components/registered-posts-log/LogTable';
import ReceivedRPLog from './components/registered-posts-log/ReceivedRPLog';
import RPLog from './components/registered-posts-log/RPLog';
import Parcel from './components/parcel-post-create/Parcel';
import QRUpload from './components/qr-scan/QRUpload';
import QRScan from './components/qr-scan/QRScan';
import PostDetails from './components/qr-scan/PostDetails';
import OnRouteUpdate from './components/qr-scan/OnRouteUpdate';
import LogTableParcel from './components/parcels-log/LogTableParcel';
import ParcelLog from './components/parcels-log/ParcelLog';

class App extends Component{

    constructor(props) {
        console.log('App Constructor');
        console.log(localStorage);

        super(props)
        
        this.state = {
            user_type: localStorage.getItem('user_type'),
            user_id: localStorage.getItem('user_id')
        }
    }

    handleLogin = (type, id) => {
        this.setState({
            user_type: type,
            user_id: id
        });
    }

    handleLogout = () => {
        this.setState({
            user_type: null,
            user_id: null
        });
    }
    
    render(){
        return(
            <Router>
                <div className='App'>
                    <Upperline/>
                    <Navi handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
                    
                    <Switch>
                        <Route exact path="/">
                            <Body />
                        </Route>
                        <Route path="/qr-scan">
                            <OnRouteUpdate />
                        </Route>
                        <Route path="/reg-post-log">
                            <RPLog />
                        </Route>
                        <Route path="/parcel-log">
                            <ParcelLog />
                        </Route>
                        <Route path="/normal-post">
                            <NormalPost />
                        </Route>
                        <Route path="/registered-post" component={RegisteredPost} />
                        <Route path="/parcel-post">
                            <Parcel />
                        </Route>
                    </Switch>                   
                    
                    <Footer/>
                </div>
            </Router>

            // <NormalPost />
            // <AddressFormNP />
            // <QRCode />

            // <RegisteredPost />

            // <LogTable />
            // <ReceivedRPLog />
            // <RPLog />

            // <Parcel />

            // <QRUpload />
            // <QRScan />
            // <PostDetails />
            // <OnRouteUpdate />

            // <LogTableParcel />
            // <ParcelLog />
        );
    }
}

export default App;
