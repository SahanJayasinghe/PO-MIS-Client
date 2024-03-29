import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ReceivedRPLog from './ReceivedRPLog'
import SentRPLog from './SentRPLog'
import Poster from '../Poster';
import { toast } from 'react-toastify';
// import Navi from '../nav-bar/Navi'

class RPLog extends Component {
    render() {
        if(localStorage.getItem('user_type') === 'post_office'){
            // console.log(localStorage);
            if(localStorage.getItem('user_token') === "undefined"){
                toast.warning('Account Token is not found. Try Logging into your account again.');
                return(
                    <h4 className="text-center">Could not retreive Registered Post Log</h4>
                )
            }
            else{
                return (
                    <>
                    {/* <Navi /> */}
                    <Poster type="Registered Post Log" description="view details of registered posts" />
                    <div className="container">
                        <ul className="nav nav-tabs nav-justified mt-3" role="tablist">
                            <li className="nav-item"><a className="nav-link active font-weight-bold" data-toggle="tab" href="#received">Received Registered Post</a></li>
                            <li className="nav-item"><a className="nav-link font-weight-bold" data-toggle="tab" role="tab" href="#sent">Sent Registered Post</a></li>
                        </ul>

                        <div className="tab-content mt-n4">
                            <div id="received" className="tab-pane show active" role="tabpanel">
                                <ReceivedRPLog />
                            </div>
                            <div id="sent" className="tab-pane fade" role="tabpanel">
                                <SentRPLog />
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        }
        else{
            toast.warning('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default RPLog