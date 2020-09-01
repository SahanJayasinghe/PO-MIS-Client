import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MODeliveryForm from './MODeliveryForm'
import {handleRequestError} from '../../helpers/error_handler';
import Poster from '../Poster';
import { server_baseURL } from '../../helpers/data';
import { toast } from 'react-toastify';

class MoneyOrderDelivery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mo_details: null,
            secret_key: null
        }
    }

    loadDetails = (mo_details, secret_key) => {
        this.setState({mo_details, secret_key});
    }

    DeliverMoneyOrder = () => {
        let id = this.state.mo_details.id;
        let secret_key = this.state.secret_key;
        let post_office = localStorage.getItem('user_id');
        axios({
            method: 'put',
            url: `${server_baseURL}/money-order/deliver`,
            data: {id, secret_key, post_office},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                let new_details = this.state.mo_details;
                new_details.status = res.data.status;
                new_details.delivered_at = res.data.delivered_at;
                this.setState({mo_details: new_details});
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    render() {
        // console.log(localStorage);
        if (localStorage.getItem('user_type') === 'post_office') {
            let {mo_details} = this.state;
            return (
                <>
                    <Poster type="deliver Money Order" description="Verify and Deliver Money Order" />
                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-around">
                                <div className="col-lg-8">
                                    <MODeliveryForm customer="receiver" loadDetails={this.loadDetails} />
                                </div>
                                {(mo_details)
                                    ? <div className="col-lg-4">
                                        <div className="alert alert-info ml-3 mt-5" role="alert">
                                            <h5 className="font-weight-bold mb-3 text-center text-dark">Money Order Verified</h5>
                                            <p className="d-flex row ml-1 my-1">Posted At :
                                                <span className="font-weight-bold ml-2">{mo_details.posted_at}</span>
                                            </p>
                                            <p className="d-flex row ml-1 my-1">Sender :
                                                <span className="font-weight-bold ml-2">{mo_details.sender_name}</span>
                                            </p>
                                            <p className="d-flex row ml-1 my-1">Receiver :
                                                <span className="font-weight-bold ml-2">{mo_details.receiver_name}</span>
                                            </p>
                                            <p className="d-flex row ml-1 my-1">Amount :
                                                <span className="font-weight-bold ml-2">{mo_details.amount}</span>
                                            </p>
                                            <p className="d-flex row ml-1 my-1">Expire At :
                                                <span className="font-weight-bold ml-2">{mo_details.expire_at}</span>
                                            </p>
                                        </div>
                                        {(mo_details.status !== 'created')
                                            ? <div className="alert alert-danger ml-3 mt-4" role="alert">
                                                <h4 className="font-weight-bold mb-2 text-danger text-center text-uppercase">{mo_details.status}</h4>
                                                <p className="d-flex text-center font-weight-bold ml-5">At {mo_details.delivered_at}</p>
                                            </div>
                                            : (mo_details.is_expired)
                                                ? <div className="alert alert-danger ml-3 mt-4" role="alert">
                                                    <h4 className="font-weight-bold mb-2 text-danger text-center text-uppercase">Expired</h4>
                                                    <p className="d-flex text-center font-weight-bold ml-5">At {mo_details.expire_at}</p>
                                                </div>
                                                : <></>
                                        }
                                        {(mo_details.status === 'created' && !mo_details.is_expired)
                                            ? <div className="row justify-content-center">
                                                <div className="col-md-10">
                                                    <div className="mt-4 cart-detail p-3 p-md-3">
                                                        {/* <div className="cart-detail p-3 p-md-3"> */}
                                                            <button onClick={this.DeliverMoneyOrder} className="btn btn-info w-100 py-3 px-4">Deliver</button>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                    : <></>
                                }
                            </div>
                        </div>
                    </section>
                </>
            )
        }
        else{
            toast.warning('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default MoneyOrderDelivery
