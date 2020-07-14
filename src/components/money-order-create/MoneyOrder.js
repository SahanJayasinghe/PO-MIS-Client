import React, { Component } from 'react'
import MoneyOrderForm from './MoneyOrderForm'
import Poster from '../Poster'
import mo_img from '../../images/money_order.png'

class MoneyOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mo_details: null
        }
    }

    loadDetails = (mo_details) => {
        this.setState({mo_details});
    }

    render() {
        let {mo_details} = this.state;
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Money Order Record' : 'Money Order Service';
        return (
            <React.Fragment>
                <Poster type='Money Order' description={descript} />
                <section className="ftco-section">
                    <div className="container">
                        {(localStorage.getItem('user_type') === 'post_office')
                            ? <div className="row justify-content-around">
                                <div className="col-lg-8">
                                    <MoneyOrderForm loadDetails={this.loadDetails} />
                                </div>
                                {(mo_details)
                                    ? <div className="col-lg-4">
                                        <div className="alert alert-success ml-3 mt-5" role="alert">
                                            <h5 className="font-weight-bold mb-3 text-center text-dark">Money Order Created</h5>
                                            <p className="d-flex row ml-1 my-1">Sender : <span className="font-weight-bold ml-2">{mo_details.sender_name}</span> </p>
                                            <p className="d-flex row ml-1 my-1">Receiver : <span className="font-weight-bold ml-2">{mo_details.receiver_name}</span> </p>
                                            <p className="d-flex row ml-1 my-1">Money Order ID : <span className="font-weight-bold ml-2">{mo_details.id}</span> </p>
                                            <p className="d-flex row ml-1 my-1">Verification Key : <span className="font-weight-bold ml-2">{mo_details.secret_key}</span> </p>
                                            <p className="d-flex row ml-1 my-1">Created At : <span className="font-weight-bold ml-2">{mo_details.created_at}</span> </p>
                                        </div>
                                        <div className="bg-dark mt-2 p-2">
                                            <p className="d-flex text-light">Receiver should provide the above details when receiving the money order at his post office</p>
                                        </div>
                                    </div>
                                    : <></>
                                }
                            </div>
                            : <>
                                <div className="row justify-content-center">
                                    {/* <h4 className="text-center">Money Order Service Description</h4> */}
                                    <div className="col-lg-4">
                                        <img src={mo_img} style={{"width": "80%"}} alt=""></img>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="alert alert-info">
                                            <p>Money Orders are managed in a computarized environment with instant service
                                                 standards by the Department of Postal Services. Due to the 'e-money-order-service',
                                                 money orders can be handed over to the receiver instantly after the postage. Encrypted
                                                 secret key verification enhances the security of money order transactions. 
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <ul className="list-unstyled ml-4">
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    Money Orders should be posted at a post office and upon postage the owner
                                                     is provided a code and some other details about the posted money order.
                                                </p></li>
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    Owner of the money order should specify the post office where the
                                                     receiver will be present to retrieve the money order
                                                </p></li>
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    Owner can also specify the expiration period of the money order
                                                     or the default will be set to 6 months.
                                                </p></li>
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    The receiver of the money order should be present in the specified
                                                     post office with the required details about the money order.
                                                </p></li>
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    After verification, the money order will be handed over to the receiver.
                                                </p></li>
                                                <li><p className="px-2 d-block text-body">
                                                    <span className="font-weight-bolder mr-2 text-success">&#10070;</span>
                                                    The owner has the ability to withdraw the money order any time and
                                                     he also has to be present at the post office with the provided details.
                                                </p></li>
                                            </ul>
                                            {/* <p className="text-body">
                                                Money Orders should be posted at a post office and upon postage the owner is provided
                                                a code and some other details about the posted money order. Owner of the money order
                                                should specify the post office where the receiver will be present to retrieve the money
                                                order. Owner can also specify the expiration period of the money order or the default
                                                will be set to 6 months. The receiver of the money order should be present in the
                                                specified post office with the required details about the money order.
                                                Upon verification, the money order will be handed over. The owner has the ability to
                                                withdraw the money order any time and he also has to be present at the post office
                                                with the provided details.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default MoneyOrder
