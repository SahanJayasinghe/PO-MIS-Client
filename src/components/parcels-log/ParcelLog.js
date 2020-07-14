import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ReceivedParcelLog from './ReceivedParcelLog'
import SentParcelLog from './SentParcelLog'
import Poster from '../Poster';

class ParcelLog extends Component {
    render() {
        if(localStorage.getItem('user_type') === 'post_office'){
            // console.log(localStorage);
            if(localStorage.getItem('user_token') === "undefined"){
                alert('Account Token is not found. Try Logging into your account again.');
                return(
                    <h4 className="text-center">Could not retreive Parcel Post Log</h4>
                )
            }
            else{
                return (
                    <>
                    <Poster type="Parcel Post Log" description="view details of parcel posts" />
                    <div className="container">
                        <ul className="nav nav-tabs nav-justified mt-3" role="tablist">
                            <li className="nav-item"><a className="nav-link active font-weight-bold" data-toggle="tab" href="#received">Received Parcels</a></li>
                            <li className="nav-item"><a className="nav-link font-weight-bold" data-toggle="tab" role="tab" href="#sent">Sent Parcels</a></li>
                        </ul>

                        <div className="tab-content mt-n4">
                            <div id="received" className="tab-pane show active" role="tabpanel">
                                <ReceivedParcelLog />
                            </div>
                            <div id="sent" className="tab-pane fade" role="tabpanel">
                                <SentParcelLog />
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        }
        else{
            alert('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default ParcelLog
