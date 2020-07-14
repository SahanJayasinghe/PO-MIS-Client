import React, { Component } from 'react'
import LogTable from '../LogTable'

class SentRPLog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            route: 'post-offices/reg-posts/sent'
        }
    }

    render() {
        const {route} = this.state;
        let post_office = localStorage.getItem('user_id');
        return (
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bg-dark cart-detail p-3 p-md-3 mb-5">
                                <h3 className="text-light font-weight-bold text-center">Registered Posts of the senders in Postal Area {post_office} </h3>
                            </div>
                            <br />
                            <h4 className="text-center">Posts that should be returned to sender</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'sender-unavailable'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Latest Delivery Attempt(Sender)', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />
                            <br />
                            <h4 className="text-center">Posts returned from receiver's post office</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'on-route-sender'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated', 'Delivery Attempts to Receiver']}
                            />
                            <br />
                            <h4 className="text-center">Posts on route to receiver</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'on-route-receiver'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated']}
                            />
                            <br />
                            <h4 className="text-center">Posts to be delivered to receiver by the receiver's post office</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'receiver-unavailable'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Current Location', 'Latest Delivery Attempt', 'Delivery Attempts(Receiver)']}
                            />
                            <br />
                            <h4 className="text-center">Posts returned to sender</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'sent-back'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivered On', 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />
                            <br />
                            <h4 className="text-center">Posts successfully delivered to receiver</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'delivered'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivered On', 'Delivery Attempts']}
                            />
                            <br />
                            <h4 className="text-center">Posts failed to deliver to receiver or sender</h4>
                            <LogTable
                                route = {route} post_type={'Registered Post'} delivery_status = {'failed'}
                                t_headers = {["Receiver's Address", "Sender's Address", 'Delivery Attempts(Receiver)', 'Delivery Attempts(Sender)']}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SentRPLog