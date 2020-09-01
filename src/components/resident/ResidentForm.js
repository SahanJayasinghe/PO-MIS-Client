import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';
import { toast } from 'react-toastify';

class ResidentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            house_number: '',
            postal_code: 'sel_default',
            resident_key: '',
            area_list: []
        }
    }

    componentDidMount(){
        axios.get(`${server_baseURL}/postal-areas`, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then(res => {
                console.log(res);
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
        let {house_number, postal_code, resident_key} = this.state;
        axios({
            method: 'post',
            url: `${server_baseURL}/resident-details/address`,
            data: {number: house_number, postal_code, resident_key},
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);
                toast.info('Address Validation succeeded!');
                this.props.loadAddress(res.data, resident_key);
            })
            .catch(err => {
                console.log(err);
                this.props.loadAddress();
                handleRequestError(err);
            })
    }

    render() {
        const {house_number, postal_code, resident_key, area_list} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Insert Your Address Details</h3>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">House Number</label>
                            <input
                                type="text"
                                name="house_number"
                                value={house_number}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter house number ex:123/A"
                                minLength="1"
                                maxLength="50"
                                pattern = '^(?=.*[A-Za-z0-9])[A-Za-z\d\-/,\\]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="country">Postal Area</label>
                            <div className="select-wrap">
                                <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                <select
                                    name="postal_code"
                                    value={postal_code}
                                    onChange={this.handleInput}
                                    title="Choose a Postal Area"
                                    className="form-control"
                                    required
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
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Access Key</label>
                            <input
                                type="password"
                                name="resident_key"
                                value={resident_key}
                                onChange={this.handleInput}
                                className="form-control"
                                placeholder="Enter Access Key"
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

export default ResidentForm
