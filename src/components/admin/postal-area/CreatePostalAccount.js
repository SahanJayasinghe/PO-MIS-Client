import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import Poster from '../../Poster';
import { server_baseURL } from '../../../helpers/data';
import { toast } from 'react-toastify';

class CreatePostalAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postal_code: 'sel_default',
            password: '',
            area_list: []
        }
    }

    componentDidMount(){
        let header_obj = {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')};
        axios.get(`${server_baseURL}/postal-areas/no-account`, {headers: header_obj})
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
        let {postal_code, password} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/post-offices`,
            data: {code: postal_code, password},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                toast.success(`Postal Account created for Postal Area ${postal_code}`);
                alert(res.data);
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    render() {
        if(localStorage.getItem('user_type') === 'admin'){
            const {postal_code, password, area_list} = this.state;
            console.log('CreatePostalAccount render');

            return (
                <>
                <Poster type="Postal Account" description="Create a Postal Account" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7">
                                <form onSubmit={this.handleSubmit} className="billing-form">
                                    <h3 className="mb-4 billing-heading">Insert Postal Account Details</h3>
                                    <div className="row justify-content-center">
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
                                                                <option
                                                                    key={area.code}
                                                                    value={area.code}>
                                                                    {area.name}, {area.code}
                                                                </option>
                                                                )
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter Password"
                                                    minLength="6"
                                                    maxLength="20"
                                                    pattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^_+\-=])[A-Za-z\d@$!%*#?&^_+\-=]{6,20}$"
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
                            </div>
                            <div className="col-xl-4">
                                <div className="alert alert-warning" role="alert">
                                    <p className="font-weight-bold">Password should contain</p>
                                    <p className="ml-3 my-1">atleast one uppercase letter</p>
                                    <p className="ml-3 my-1">atleast one lowercase letter</p>
                                    <p className="ml-3 my-1">atleast one special character</p>
                                    <p className="ml-3 my-1">atleast one number</p>
                                    <p className="ml-3 my-1">minimum 6 characters</p>
                                    <p className="ml-3 my-1">maximum 20 characters</p>
                                    <p className="ml-3 my-1">no whitespaces, bracketes, quotes or slashes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </>
            )
        }
        else{
            toast.warning('Unauthorized Feature. Only for admin use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default CreatePostalAccount
