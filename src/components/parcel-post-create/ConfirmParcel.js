import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';

class ConfirmParcel extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            receiver_name: props.receiver_name,
            address: props.address
        }
    }

    componentDidUpdate(prevProps){
        let name_check = (this.props.receiver_name !== prevProps.receiver_name);
        let address_check = (this.props.address[0] !== prevProps.address[0]);
        if(name_check || address_check){
            console.log('ConfirmParcel componentDidUpdate');
            console.log(this.props);
            // let {id, number, street, sub_area, postal_area, postal_code} = this.props.address;
            // let price = this.props.price;
            this.setState({receiver_name: this.props.receiver_name, address: this.props.address});
        }
    }

    handleConfirm = () => {
        let receiver = {
            id: this.state.address[0],
            name: this.props.receiver_name
        }
        let post_obj = {
            receiver,
            payment: this.props.payment,
            descript: this.props.descript,
            post_office: localStorage.getItem('user_id')
        };

        axios({
            method: 'post',
            url: 'http://localhost:5000/parcel-post',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);                
                this.props.loadQR(res.data, this.state.address);             
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err); 
            })
        // this.props.loadQR(this.props.address);
    }
    
    render() {
        let {receiver_name, address} = this.state;
        return (
            <div className="col-xl-5">
                <div className="row mt-5 pt-3">
                    <div className="col-md-10 d-flex mb-4">
                        <div className="cart-detail cart-total p-3 p-md-4">
                            <h3 className="billing-heading mb-3 text-center">Delivery Address</h3>
                            <p className="d-flex"> <span>{receiver_name},</span> </p>
                            {
                                address.slice(1).map((el, idx) => (
                                    <p key={idx} className="d-flex font-weight-bold"> <span>{el},</span> </p>
                                ))
                            }								
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

export default ConfirmParcel