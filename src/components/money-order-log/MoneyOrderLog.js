import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import MoneyOrderTable from './MoneyOrderTable'

class MoneyOrderLog extends Component {

    render() {        
        if(localStorage.getItem('user_type') === 'post_office'){
            console.log(localStorage);
            if(localStorage.getItem('user_token') === "undefined"){
                alert('Account Token is not found. Try Logging into your account again.');
                return(
                    <h4 className="text-center">Could not retreive Money Order Log</h4>
                )
            }
            else{
                let post_office = localStorage.getItem('user_id');
                return (
                    <section className="ftco-section ftco-cart">
                        <div className="container">                
                            <ul className="nav nav-tabs nav-justified" role="tablist">
                                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#received">Received Money Orders</a></li>
                                <li className="nav-item"><a className="nav-link" data-toggle="tab" role="tab" href="#sent">Sent Money Orders</a></li>                    
                            </ul>

                            <div className="tab-content">
                                <div id="received" className="tab-pane show active" role="tabpanel">
                                    <div className="row mt-5">
                                        <div className="col-xl-12">
                                            <div className="bg-dark cart-detail p-3 p-md-3 mb-5">
                                                <h3 className="text-light font-weight-bold text-center">Money Orders received to post office {post_office} </h3>
                                            </div>
                                            <br />
                                            <h4 className="text-center">Money Orders to deliver</h4>
                                            <MoneyOrderTable route="received" status="created"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Expire At', 'Posted Location', 'Posted At']}
                                            />
                                            <br />
                                            <h4 className="text-center">Delivered Money Orders </h4>
                                            <MoneyOrderTable route="received" status="delivered"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Delivered At', 'Posted Location', 'Posted At']}
                                            />
                                            <br />
                                            <h4 className="text-center">Money Orders Returned by sender's post office</h4>
                                            <MoneyOrderTable route="received" status="returned"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Returned At', 'Posted Location', 'Posted At']}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id="sent" className="tab-pane fade" role="tabpanel">                            
                                    <div className="row mt-5">
                                        <div className="col-xl-12">
                                            <div className="bg-dark cart-detail p-3 p-md-3 mb-5">
                                                <h3 className="text-light font-weight-bold text-center">Money Orders created by post office {post_office} </h3>
                                            </div>
                                            <br />
                                            <h4 className="text-center">Money Orders to be delivered by Receiver's post office</h4>
                                            <MoneyOrderTable route="sent" status="created"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Expire At', 'Receiver Location', 'Posted At']}
                                            />
                                            <br />
                                            <h4 className="text-center">Delivered Money Orders </h4>
                                            <MoneyOrderTable route="sent" status="delivered"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Delivered At', 'Receiver Location', 'Posted At']}
                                            />
                                            <br />
                                            <h4 className="text-center">Returned Money Orders</h4>
                                            <MoneyOrderTable route="sent" status="returned"
                                            t_headers={['Sender', 'Receiver', 'Amount', 'Returned At', 'Receiver Location', 'Posted At']}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        }
        else{
            alert('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default MoneyOrderLog
