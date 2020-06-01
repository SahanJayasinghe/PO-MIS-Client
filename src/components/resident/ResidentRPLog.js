import React, { Component } from 'react'
import LogTable from '../LogTable'

class ResidentRPLog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            resident_id: props.resident_id,
            resident_key: props.resident_key
        }
    }
    
    componentDidUpdate(prevProps){
        let {resident_id, resident_key} = this.props;
        if(prevProps.resident_id !== resident_id){
            this.setState({resident_id, resident_key});
        }
    }

    render() {
        const route_received = 'resident-details/reg-posts/received';
        const route_sent = 'resident-details/reg-posts/sent';
        const {resident_id, resident_key} = this.state;
        return (
            <div className="container">               
                <ul className="nav nav-tabs nav-justified" role="tablist">
                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#received">Received Registered Post</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" role="tab" href="#sent">Sent Registered Post</a></li>                    
                </ul>

                <div className="tab-content">
                    <div id="received" className="tab-pane show active" role="tabpanel">
                        <div className="row mt-5">
                            <div className="col-xl-12">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-8 alert alert-info" role="alert">
                                        <h4 className="font-weight-bold text-center">Registered Posts received to this address</h4>
                                    </div>
                                </div>
                                <h4 className="text-center">Posts to be delivered</h4>
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_received} post_type={'Registered Post'} delivery_status = {'delivering'}                                
                                    t_headers = {["Sender", "Receiver", 'Current Location', 'Updated At', 'Delivery Attempts', 'Posted On']}
                                />
                                <br />
                                <h4 className="text-center">Returned Posts on route to Sender's Address</h4>                                                                
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_received} post_type={'Registered Post'} delivery_status = {'returning'}                                
                                    t_headers = {["Sender", "Receiver", 'Current Location', 'Updated At', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                /> 
                                <br />
                                <h4 className="text-center">Posts delivered to your address successfully</h4>                                   
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_received} post_type={'Registered Post'} delivery_status = {'delivered'}                                
                                    t_headers = {["Sender", "Receiver", 'Delivered On', 'Delivery Attempts', 'Posted On']}
                                />
                                <br />
                                <h4 className="text-center">Posts delivered back to Sender</h4>                                 
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_received} post_type={'Registered Post'} delivery_status = {'sent-back'}                                
                                    t_headers = {["Sender", "Receiver", 'Delivered On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                />  
                                <br />
                                <h4 className="text-center">Posts discarded</h4>                                  
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_received} post_type={'Registered Post'} delivery_status = {'failed'}                                
                                    t_headers = {["Sender", "Receiver", 'Discarded On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                />                                    
                            </div>
                        </div>
                    </div>
                    <div id="sent" className="tab-pane fade" role="tabpanel">
                        <div className="row mt-5">
                            <div className="col-xl-12">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-8 alert alert-info" role="alert">
                                        <h4 className="font-weight-bold text-center">Registered Posts sent from this address</h4>
                                    </div>
                                </div>
                                <h4 className="text-center">Returned Posts on route to Your Address</h4>                                                                
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_sent} post_type={'Registered Post'} delivery_status = {'returning'}                                
                                    t_headers = {["Sender", "Receiver", 'Current Location', 'Updated At', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                /> 
                                <br />
                                <h4 className="text-center">Posts to be delivered to Receiver</h4>
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_sent} post_type={'Registered Post'} delivery_status = {'delivering'}                                
                                    t_headers = {["Sender", "Receiver", 'Current Location', 'Updated At', 'Delivery Attempts', 'Posted On']}
                                />
                                <br />                                    
                                <h4 className="text-center">Posts delivered to Receiver successfully</h4>                                   
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_sent} post_type={'Registered Post'} delivery_status = {'delivered'}                                
                                    t_headers = {["Sender", "Receiver", 'Delivered On', 'Delivery Attempts', 'Posted On']}
                                />
                                <br />
                                <h4 className="text-center">Posts delivered back to Your Address</h4>                                 
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_sent} post_type={'Registered Post'} delivery_status = {'sent-back'}                                
                                    t_headers = {["Sender", "Receiver", 'Delivered On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                />  
                                <br />
                                <h4 className="text-center">Posts discarded</h4>                                  
                                <LogTable  resident_id = {resident_id} resident_key = {resident_key}                              
                                    route = {route_sent} post_type={'Registered Post'} delivery_status = {'failed'}                                
                                    t_headers = {["Sender", "Receiver", 'Discarded On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)', 'Posted On']}
                                />                                    
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default ResidentRPLog
