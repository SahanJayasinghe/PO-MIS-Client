import React, { Component } from 'react'
import {handleRequestError} from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';
import { toast } from 'react-toastify';
const axios = require('axios');

class ConfirmRP extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // receiver: ['1', '46', 'Mill Rd', 'Hiriwala', 'kal-eliya', '11160'],
            // sender: ['2', '121/B', 'Temple Rd', 'Rawathawatta', 'moratuwa', '10400']
            receiver: props.receiver,
            sender: props.sender,
            receiver_name: props.rp_details.receiver_name,
            sender_name: props.rp_details.sender_name
        }
    }

    componentDidUpdate(prevProps){
        let check1 = (prevProps.rp_details.receiver_name !== this.props.rp_details.receiver_name);
        let check2 = (prevProps.rp_details.sender_name !== this.props.rp_details.sender_name);
        let check3 = (this.props.receiver[0] !== prevProps.receiver[0]);
        let check4 = (this.props.sender[0] !== prevProps.sender[0]);
        if(check1 || check2 || check3 || check4){
            console.log('ConfirmRP componentDidUpdate');
            console.log(this.props);
            // let {id, number, street, sub_area, postal_area, postal_code} = this.props.address;
            // let price = this.props.price;
            this.setState({
                receiver: this.props.receiver,
                sender: this.props.sender,
                receiver_name: this.props.rp_details.receiver_name,
                sender_name: this.props.rp_details.sender_name
            });
        }
    }

    handleConfirm = () => {
        // console.log(this.state);
        let post_obj = {
            receiver: {id: this.state.receiver[0], name: this.state.receiver_name},
            sender: {id: this.state.sender[0], name: this.state.sender_name},
            price: this.props.rp_details.price,
            speed_post: this.props.rp_details.speed_post,
            post_office: localStorage.getItem('user_id')
        }
        axios({
            method: 'post',
            url: `${server_baseURL}/registered-post`,
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                toast.success('Registered Post record created!');
                this.props.loadQR(res.data, this.state.receiver, this.state.sender);
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    render() {
        const {receiver, sender, receiver_name, sender_name} = this.state;
        return (
            <div className="col-xl-8">
                <div className="row mt-5 pt-3">
                    <div className="col-md-12 d-flex mb-5">
                        <div className="col-md-6">
                            <div className="cart-detail cart-total p-3 p-md-3">
                                <h3 className="billing-heading mb-3 text-center">Receiver Address</h3>
                                <p className="d-flex font-weight-bold mx-2"> {receiver_name}, </p>
                                {
                                    receiver.slice(1).map((el, idx) => (
                                        <p key={idx} className="d-flex font-weight-bold mx-2"> {el}, </p>
                                    ))
                                }
                                {/* <p className="d-flex"> <span>{receiver.number},</span> </p>
                                {
                                    (receiver.street !== null)
                                        ? <p className="d-flex"> <span>{receiver.street},</span> </p>
                                        : <p></p>
                                }
                                {
                                    (receiver.sub_area !== null)
                                        ? <p className="d-flex"> <span>{receiver.sub_area},</span> </p>
                                        : <p></p>
                                }
                                <p className="d-flex"> <span>{receiver.postal_area},</span> </p>
                                <p className="d-flex"> <span>{receiver.postal_code}</span> </p> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="cart-detail cart-total p-3 p-md-3">
                                <h3 className="billing-heading mb-3 text-center">Sender Address</h3>
                                <p className="d-flex font-weight-bold mx-2"> {sender_name}, </p>
                                {
                                    sender.slice(1).map((el, idx) => (
                                        <p key={idx} className="d-flex font-weight-bold mx-2"> {el}, </p>
                                    ))
                                }
                                {/* <p className="d-flex"> <span>{sender.number},</span> </p>
                                {
                                    (sender.street !== null)
                                        ? <p className="d-flex"> <span>{sender.street},</span> </p>
                                        : <p></p>
                                }
                                {
                                    (sender.sub_area !== null)
                                        ? <p className="d-flex"> <span>{sender.sub_area},</span> </p>
                                        : <p></p>
                                }
                                <p className="d-flex"> <span>{sender.postal_area},</span> </p>
                                <p className="d-flex"> <span>{sender.postal_code}</span> </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="cart-detail p-3 p-md-3">
                                    <p><button onClick={this.handleConfirm} className="btn btn-primary py-3 px-4">Confirm Address</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmRP