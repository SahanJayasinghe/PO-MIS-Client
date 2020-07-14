import React, { Component } from 'react'
import LogTable from '../LogTable';

class ResidentParcelLog extends Component {
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
        const route = 'resident-details/parcels';
        const {resident_id, resident_key} = this.state;
        return (
            <div className="row mt-5">
                <div className="col-xl-12">
                    <div className="row justify-content-center mb-4">
                        <div className="col-md-8 alert alert-info" role="alert">
                            <h4 className="font-weight-bold text-center">Parcels received to this address</h4>
                        </div>
                    </div>
                    <h4 className="text-center">Parcels to be delivered</h4>
                    <LogTable  resident_id = {resident_id} resident_key = {resident_key}
                        route = {route} post_type={'Parcel'} delivery_status = {'delivering'}
                        t_headers = {["Receiver", 'Description', 'Current Location', 'Updated On', 'Delivery Attempts', 'Posted At']}
                    />
                    <br />
                    <h4 className="text-center">Parcels successfully delivered</h4>
                    <LogTable  resident_id = {resident_id} resident_key = {resident_key}
                        route = {route} post_type={'Parcel'} delivery_status = {'delivered'}
                        t_headers = {["Receiver", 'Description', 'Delivered On', 'Delivery Attempts', 'Posted At']}
                    />
                    <br />
                    <h4 className="text-center">Parcels discarded due to unavailability of the receiver</h4>
                    <LogTable  resident_id = {resident_id} resident_key = {resident_key}
                        route = {route} post_type={'Parcel'} delivery_status = {'failed'}
                        t_headers = {["Receiver", 'Description', 'Discarded On', 'Delivery Attempts', 'Posted At']}
                    />
                </div>
            </div>
        )
    }
}

export default ResidentParcelLog
