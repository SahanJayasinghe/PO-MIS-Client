import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navi from './components/nav-bar/Navi';
import Upperline from './components/UpperLine';
import Body from './components/Body';
import Footer from './components/Footer'
import NormalPost from './components/normal-post-create/NormalPost';
// import AddressFormNP from './components/normal-post-create/AddressFormNP';
// import QRCode from './components/QRCode';
import RegisteredPost from './components/registered-post-create/RegisteredPost';
// import LogTable from './components/LogTable';
// import ReceivedRPLog from './components/registered-posts-log/ReceivedRPLog';
import RPLog from './components/registered-posts-log/RPLog';
import Parcel from './components/parcel-post-create/Parcel';
// import QRUpload from './components/qr-scan/QRUpload';
// import QRScan from './components/qr-scan/QRScan';
// import PostDetails from './components/qr-scan/PostDetails';
import PostUpdatePage from './components/qr-scan/PostUpdatePage';
// import LogTableParcel from './components/parcels-log/LogTableParcel';
import ParcelLog from './components/parcels-log/ParcelLog';
import CreateAddress from './components/admin/address/CreateAddress';
import AddressLog from './components/admin/address/AddressLog';
import CreatePostalArea from './components/admin/postal-area/CreatePostalArea';
import PostalAreaLog from './components/admin/postal-area/PostalAreaLog';
import CreatePostalAccount from './components/admin/postal-area/CreatePostalAccount';
// import ResidentForm from './components/resident/ResidentForm';
// import ResidentRPLog from './components/resident/ResidentRPLog';
// import ResidentParcelLog from './components/resident/ResidentParcelLog';
// import ResidentNPLog from './components/resident/ResidentNPLog';
import ResidentPage from './components/resident/ResidentPage';
import NotFoundPage from './components/NotFoundPage';
// import MoneyOrderForm from './components/money-order-create/MoneyOrderForm';
import MoneyOrder from './components/money-order-create/MoneyOrder';
import MoneyOrderDelivery from './components/money-order-delivery/MoneyOrderDelivery';
// import MoneyOrderTable from './components/money-order-log/MoneyOrderTable';
import MoneyOrderLog from './components/money-order-log/MoneyOrderLog';
import MoneyOrderReturn from './components/money-order-delivery/MoneyOrderReturn';

class App extends Component{

    constructor(props) {
        console.log('App Constructor');
        // console.log(localStorage);

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
                            <PostUpdatePage />
                        </Route>
                        <Route path="/reg-post-log">
                            <RPLog />
                        </Route>
                        <Route path="/parcel-log">
                            <ParcelLog />
                        </Route>
                        <Route path="/money-order-log">
                            <MoneyOrderLog />
                        </Route>
                        <Route path="/normal-post">
                            <NormalPost />
                        </Route>
                        <Route path="/registered-post" component={RegisteredPost} />
                        <Route path="/parcel-post">
                            <Parcel />
                        </Route>
                        <Route path="/money-order">
                            <MoneyOrder />
                        </Route>
                        <Route path="/money-order-deliver">
                            <MoneyOrderDelivery />
                        </Route>
                        <Route path="/money-order-return">
                            <MoneyOrderReturn />
                        </Route>
                        <Route path="/address">
                            <CreateAddress />
                        </Route>
                        <Route path="/address-log">
                            <AddressLog />
                        </Route>
                        <Route path="/postal-area">
                            <CreatePostalArea />
                        </Route>
                        <Route path="/postal-area-log">
                            <PostalAreaLog />
                        </Route>
                        <Route path="/postal-account">
                            <CreatePostalAccount />
                        </Route>
                        <Route path="/resident">
                            <ResidentPage />
                        </Route>
                        {/* {
                            ( !localStorage.getItem('user_type'))
                            ? <Route path="/resident">
                                <ResidentPage />
                            </Route>
                            : <></>
                        } */}
                        <Route component={NotFoundPage} />
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
            // <PostUpdatePage />

            // <LogTableParcel />
            // <ParcelLog />

            // <CreateAddress />
            // <AddressLog />
            // <CreatePostalArea />
            // <PostalAreaLog />
            // <CreatePostalAccount />

            // <ResidentForm />
            // <ResidentRPLog />
            // <ResidentParcelLog />
            // <ResidentNPLog />
            // <ResidentPage />

            // <MoneyOrderForm />
            // <MoneyOrder />
            // <MoneyOrderDelivery />
            // <MoneyOrderTable />
            // <MoneyOrderLog />

            // [2, '121/B', 'Temple Rd', 'rawathawatta', 'moratuwa', '10400']

            // <QRCode type="RegPost" id={'1'}
            // sender={ [1, '46', 'Mill Rd', 'Hiriwala', 'kal-eliya', '11160'] }
            // receiver={ [2, '121/B', 'Temple Rd', 'rawathawatta', 'moratuwa', '10400'] } />

            // <QRCode type="Parcel" id={'6'}
            // address={ [2, '121/B', 'Temple Rd', 'rawathawatta', 'moratuwa', '10400'] } />
        );
    }
}

export default App;
