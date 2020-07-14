import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ResidentForm from './ResidentForm'
import ResidentRPLog from './ResidentRPLog'
import ResidentParcelLog from './ResidentParcelLog'
import ResidentNPLog from './ResidentNPLog'
import Poster from '../Poster'

class ResidentPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: null,
            resident_key: null
        }
    }

    loadAddress = (address, resident_key) => {
        // console.log(address);
        if(address && resident_key){
            this.setState({address, resident_key});
        }
        else if(this.state.address && this.state.resident_key){
            this.setState({address: null, resident_key: null});
        }
    }

    render() {
        if ( !localStorage.getItem('user_type') ) {
            const {address, resident_key} = this.state;
            return (
                <>
                <Poster type="Your Mail" description="View Mail Logs of Your Address" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-around">
                            <div className="col-xl-7">
                                <ResidentForm loadAddress={this.loadAddress} />
                            </div>
                            { (address) ?
                                <div className="col-xl-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 mt-5">
                                            <div className="alert alert-info" role="alert">
                                                <p className="font-weight-bold mb-2">Your Address</p>
                                                {
                                                    address.slice(1).map( (el, idx) => (
                                                            <p key={idx} className="ml-3 my-1">{el}</p>
                                                        )
                                                    )
                                                }
                                                {/* <p className="ml-3 my-1">121/B</p>
                                                <p className="ml-3 my-1">Temple Rd.</p>
                                                <p className="ml-3 my-1">Rawathawatta</p>
                                                <p className="ml-3 my-1">Moratuwa</p>
                                                <p className="ml-3 my-1">10400</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-8 mt-2">
                                            <div className="alert alert-secondary" role="alert">
                                                <p>View Details of the postal items sent from or received to this address
                                                    from the menu shown down below</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                        { (address) ?
                            <>
                            <div className="row justify-content-around mt-5">
                                {/* <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-primary mx-2" style={btnStyle}>Registered Post</button>
                                    <button type="button" className="btn btn-outline-primary mx-2">Parcels</button>
                                    <button type="button" className="btn btn-outline-primary mx-2">Normal Post</button>
                                    <button type="button" className="btn btn-outline-primary mx-2" style={btnStyle}>Money Order</button>
                                </div> */}
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item mx-2">
                                        <a className="nav-link active" id="pills-regPost" data-toggle="pill" href="#regPost" role="tab" aria-controls="pills-regPost" aria-selected="true">Registered Post</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" id="pills-parcel" data-toggle="pill" href="#parcelPost" role="tab" aria-controls="pills-parcelPost" aria-selected="false">Parcel Post</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" id="pills-normalPost" data-toggle="pill" href="#normalPost" role="tab" aria-controls="pills-normalPost" aria-selected="false">Normal Post</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="row justify-content-around mt-3">
                                <div className="tab-content col-md-12" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="regPost" role="tabpanel" aria-labelledby="pills-regPost-tab">
                                        <ResidentRPLog resident_id = {address[0]} resident_key = {resident_key} />
                                    </div>
                                    <div className="tab-pane fade" id="parcelPost" role="tabpanel" aria-labelledby="pills-parcelPost-tab">
                                        <ResidentParcelLog resident_id = {address[0]} resident_key = {resident_key} />
                                    </div>
                                    <div className="tab-pane fade" id="normalPost" role="tabpanel" aria-labelledby="pills-normalPost-tab">
                                        <ResidentNPLog resident_id = {address[0]} resident_key = {resident_key} />
                                    </div>
                                </div>
                            </div>
                            </>
                            : <></>
                        }
                    </div>
                </section>
                </>
            )
        }
        else {
            alert('Only for the use of residents');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default ResidentPage
