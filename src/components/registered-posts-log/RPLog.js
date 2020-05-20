import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ReceivedRPLog from './ReceivedRPLog'
import SentRPLog from './SentRPLog'
import Navi from '../nav-bar/Navi'

class RPLog extends Component {
    render() {
        if(localStorage.getItem('user_type') === 'post_office'){
            console.log(localStorage);
            if(localStorage.getItem('user_token') === "undefined"){
                alert('Account Token is not found. Try Logging into your account again.');
                return(
                    <h4 className="text-center">Could not retreive Registered Post Log</h4>
                )
            }
            else{
                return (
                    <>
                    {/* <Navi /> */}
                    <div className="container">                
                        <ul className="nav nav-tabs nav-justified" role="tablist">
                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#received">Received Registered Post</a></li>
                            <li className="nav-item"><a className="nav-link" data-toggle="tab" role="tab" href="#sent">Sent Registered Post</a></li>                    
                        </ul>
        
                        <div className="tab-content">
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
            alert('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />
            )            
        }
    }
}

export default RPLog