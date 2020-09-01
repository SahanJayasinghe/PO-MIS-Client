import React, { Component } from 'react';
import {handleRequestError} from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';
import { toast } from 'react-toastify';
const axios = require('axios');

class ConfirmNP extends Component{

    constructor(props){
        super(props);
        console.log('ConfirmNP constructor');
        console.log(props);
        // const {id, number, street, sub_area, postal_area, postal_code} = props.address;

        this.state = {
            address: props.address,
            price: props.price
        }
    }

    componentDidUpdate(prevProps){
        if((this.props.address[0] !== prevProps.address[0]) || (this.props.price !== prevProps.price)){
            console.log('ConfirmNP componentDidUpdate');
            console.log(this.props);
            // let {id, number, street, sub_area, postal_area, postal_code} = this.props.address;
            // let price = this.props.price;
            this.setState({address: this.props.address, price: this.props.price});
        }
    }

    handleConfirm = () => {
        let put_obj = {id: this.state.address[0], price: this.state.price};

        axios({
            method: 'put',
            url: `${server_baseURL}/normal-post`,
            data: put_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                toast.success('Normal Post added successfully!');
                this.props.loadQR(this.props.address);
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
        // this.props.loadQR(this.props.address);
    }

    render(){
        console.log('ConfirmNP render');
        let {address} = this.state;
        return(
            <div className="col-xl-5">
                <div className="row mt-5 pt-3">
                    <div className="col-md-10 d-flex mb-4">
                        <div className="cart-detail cart-total p-3 p-md-4">
                            <h3 className="billing-heading mb-3 text-center">Delivery Address</h3>
                            {
                                address.slice(1).map((el, idx) => (
                                    <p key={idx} className="d-flex font-weight-bold"> <span>{el},</span> </p>
                                ))
                            }
                            {/* <p className="d-flex"> <span>{this.state.number},</span> </p>
                            {
                                (this.state.street !== null)
                                    ? <p className="d-flex"> <span>{this.state.street},</span> </p>
                                    : <p></p>
                            }
                            {
                                (this.state.sub_area !== null)
                                    ? <p className="d-flex"> <span>{this.state.sub_area},</span> </p>
                                    : <p></p>
                            }
                            <p className="d-flex"> <span>{this.state.postal_area},</span> </p>
                            <p className="d-flex"> <span>{this.state.postal_code}</span> </p> */}
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="cart-detail p-3 p-md-3">
                            <p><button onClick={this.handleConfirm} className="btn btn-primary py-3 px-4">Confirm Address</button></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmNP;