import React, { Component } from 'react'
import LogTable from './LogTable'

class ReceivedRPLog extends Component {

    constructor(props) {
        super(props)
    
        this.state = {            
            category: 'received'
        }
    }    

    render() {
        const {category} = this.state;
        let post_office = localStorage.getItem('user_id');
        return (
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bg-dark cart-detail p-3 p-md-3">                        
                                <h3 className="text-light font-weight-bold text-center">Registered Posts of the receivers in Postal Area {post_office} </h3>
                            </div>
                            <br />
                            <h4 className="text-center">Posts to be delivered to receiver (Already attempted)</h4>
                            <LogTable                                
                                category = {category}
                                delivery_status = {'receiver-unavailable'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Latest Delivery Attempt', 'Delivery Attempts(Receiver)']}
                            />
                            <br />
                            <h4 className="text-center">Posts still on route or just received to post office</h4>
                            <LogTable                                
                                category = {category}
                                delivery_status = {'on-route-receiver'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated']}
                            />
                            <br />                               
                            <h4 className="text-center">Posts returned to sender due to unavailability of the receiver</h4>
                            <LogTable                                
                                category = {category}
                                delivery_status = {'on-route-sender'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated', 'Delivery Attempts(Receiver)']}
                            />
                            <br />
                            <h4 className="text-center">Returned Posts that are in sender's postal area</h4>
                            <LogTable
                                category = {category}
                                delivery_status = {'sender-unavailable'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Latest Delivery Attempt to Sender', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />
                            <br />
                            <h4 className="text-center">Posts successfully delivered to receiver</h4>
                            <LogTable
                                category = {category}
                                delivery_status = {'delivered'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivered On', 'Delivery Attempts']}
                            />
                            <br />
                            <h4 className="text-center">Posts delivered to sender after returning</h4>
                            <LogTable
                                category = {category}
                                delivery_status = {'sent-back'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivered On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />
                            <br />
                            <h4 className="text-center">Posts failed to deliver to receiver or sender</h4>
                            <LogTable
                                category = {category}
                                delivery_status = {'failed'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ReceivedRPLog