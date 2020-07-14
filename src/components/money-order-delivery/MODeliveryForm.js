import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';

class MODeliveryForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sender_name: '',
            receiver_name: '',
            id: '',
            secret_key: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let post_obj = this.state;
        post_obj.post_office = localStorage.getItem('user_id');
        axios({
            method: 'post',
            url: `${server_baseURL}/money-order/verify/${this.props.customer}`,
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                this.props.loadDetails(res.data, this.state.secret_key);
            })
            .catch(err => {
                console.log(err);
                this.props.loadDetails(null, null);
                handleRequestError(err);
            })
    }

    render() {
        let {sender_name, receiver_name, id, secret_key} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Fill in Money Order Verification Details</h3>
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Sender's Name</label>
                            <input
                                type="text"
                                name="sender_name"
                                value={sender_name}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter Sender's name"
                                minLength="1"
                                maxLength="50"
                                pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Receiver's Name</label>
                            <input
                                type="text"
                                name="receiver_name"
                                value={receiver_name}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter Receiver's name"
                                minLength="1"
                                maxLength="50"
                                pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Posted Date</label>
                            <input
                                type="date"
                                name="posted_date"
                                value={posted_date}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter the date ex: 2020-05-16"
                                // pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Posted Time</label>
                            <input
                                type="time"
                                name="posted_time"
                                value={posted_time}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter the time ex: 04:26 PM"
                                // pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                </div> */}
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Money Order ID</label>
                            <input
                                type="number"
                                name="id"
                                value={id}
                                onChange={this.handleInput}
                                className="form-control"
                                min="1"
                                placeholder="Enter id number"
                                // pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Key Code</label>
                            <input
                                type="password"
                                name="secret_key"
                                value={secret_key}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter the provided key"
                                minLength="1"
                                maxLength="20"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="form-group mt-4 cart-detail p-3 p-md-3">
                            {/* <div className="cart-detail p-3 p-md-3"> */}
                                <button type="submit" className="btn btn-primary py-3 px-4">Submit Details</button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default MODeliveryForm
