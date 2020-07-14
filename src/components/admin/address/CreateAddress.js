import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import Poster from '../../Poster';
import { server_baseURL } from '../../../helpers/data';

class CreateAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number: '',
            street: '',
            sub_area: '',
            postal_code: 'sel_default',
            area_list: [],
            res_data: null
        }
    }

    componentDidMount(){
        axios.get(`${server_baseURL}/postal-areas`, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then(res => {
                // console.log(res);
                this.setState({
                    area_list: res.data
                });
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let {number, street, sub_area, postal_code} = this.state;
        let post_obj = {number, street, sub_area, postal_code};
        axios({
            method: 'post',
            url: `${server_baseURL}/addresses`,
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                this.setState({res_data: res.data});
            })
            .catch(err => {
                console.log(err);
                this.setState({res_data: null});
                handleRequestError(err);
            })
    }

    render() {
        if(localStorage.getItem('user_type') === 'admin'){
            const {number, street, sub_area, postal_code, area_list, res_data} = this.state;

            return (
                <>
                <Poster type="Address" description="Create a new Address" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <form onSubmit={this.handleSubmit} className="billing-form">
                                    <h3 className="mb-4 billing-heading">Insert Address Details</h3>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">House Number <span className="text-danger">(*Required)</span></label>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    value={number}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter House Number ex:123/A"
                                                    minLength="1"
                                                    maxLength="50"
                                                    pattern = '^(?=.*[A-Za-z0-9])[A-Za-z\d\-/,\\]{1,50}$'
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Street <span className="text-info">(Optional)</span></label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={street}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter Street"
                                                    minLength="1"
                                                    maxLength="50"
                                                    pattern = '^(?=.*[A-Za-z])[A-Za-z\d\-/()\\.,\s]{1,50}$'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Sub Area <span className="text-info">(Optional)</span></label>
                                                <input
                                                    type="text"
                                                    name="sub_area"
                                                    value={sub_area}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter Sub Area"
                                                    minLength="1"
                                                    maxLength="50"
                                                    pattern = '^(?=.*[A-Za-z])[A-Za-z\d\-/()\\.,\s]{1,50}$'
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="country">Postal Area <span className="text-danger">(*Required)</span></label>
                                                <div className="select-wrap">
                                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                    <select
                                                        name="postal_code"
                                                        value={postal_code}
                                                        onChange={this.handleInput}
                                                        title="Choose a Postal Area"
                                                        className="form-control"
                                                        required
                                                        // dataWidth="auto"
                                                        // dataLiveSearch="true"
                                                    >
                                                        <option value="sel_default" disabled>Select a postal area</option>
                                                        {
                                                            area_list.map(area => (
                                                                <option key={area.code} value={area.code}>
                                                                    {area.name}, {area.code}
                                                                </option>
                                                                )
                                                            )
                                                        }
                                                    </select>
                                                </div>
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
                            </div>
                            { (res_data)
                                ? <div className="col-xl-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 p-md-3 mt-5">
                                            <div className="cart-detail bg-info p-3 p-md-3">
                                                <p className="text-light font-weight-bold text-center">Address Record Created</p>
                                                <p className="text-light">{res_data.address}</p>
                                                <p className="text-light">Resident's Access Key: {res_data.resident_key}</p>
                                            </div>
                                        </div>
                                    </div>
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
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default CreateAddress
