import React, { Component } from 'react'
import LogTableParcel from './LogTableParcel';

class ReceivedParcelLog extends Component {
    render() {
        const category = 'received';
        const post_office = localStorage.getItem('user_id');

        return (
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bg-dark cart-detail p-3 p-md-3">
                                <h3 className="text-light font-weight-bold text-center">Parcel Posts of the receivers in Postal Area {post_office} </h3>
                            </div>
                            <br />
                            <h4 className="text-center">Parcels that should be attempted again to deliver</h4>
                            <LogTableParcel category = {category} delivery_status = {'receiver-unavailable'}                                
                                t_headers = {["Receiver's Address", "Posted From", 'Latest Delivery Attempt', 'Delivery Attempts']}
                            />
                            <br />
                            <h4 className="text-center">Parcels on route or just received to post office </h4>
                            <LogTableParcel category = {category} delivery_status = {'on-route-receiver'}                                
                                t_headers = {["Receiver's Address", "Posted From", 'Current Location', 'Last Updated']}
                            />
                            <br />
                            <h4 className="text-center">Parcels delivered to receiver </h4>
                            <LogTableParcel category = {category} delivery_status = {'delivered'}                                
                                t_headers = {["Receiver's Address", "Posted From", 'Delivered On', 'Delivery Attempts']}
                            />
                            <br />
                            <h4 className="text-center">Parcels failed to deliver to receiver </h4>
                            <LogTableParcel category = {category} delivery_status = {'failed'}                                
                                t_headers = {["Receiver's Address", "Posted From", 'Last Delivery Attempt', 'Delivery Attempts']}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ReceivedParcelLog
