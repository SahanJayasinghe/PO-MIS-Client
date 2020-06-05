import React, { Component } from 'react'
import MoneyOrderForm from './MoneyOrderForm'
import Poster from '../Poster'

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
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Money Order Record' : 'Money Order Sevice';
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
                            : <div className="row justify-content-center">
                            <h4 className="text-center">Money Order Service Description</h4>
                        </div>
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default MoneyOrder
