import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import Poster from '../../Poster';
import { server_baseURL } from '../../../helpers/data';
import { toast } from 'react-toastify';

class CreatePostalArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: '',
            name: '',
            postal_area: null
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let post_obj = {code: this.state.code, name: this.state.name};
        axios({
            method: 'post',
            url: `${server_baseURL}/postal-areas`,
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                toast.success('Postal Area record created!');
                this.setState({postal_area: res.data});
            })
            .catch(err => {
                console.log(err);
                this.setState({postal_area: null});
                handleRequestError(err);
            })
    }

    render() {
        if(localStorage.getItem('user_type') === 'admin'){
            const {code, name, postal_area} = this.state;
            return (
                <>
                <Poster type="Postal Area" description="Add a new Postal Area" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <form onSubmit={this.handleSubmit} className="billing-form">
                                    <h3 className="mb-4 billing-heading">Insert Postal Area Details</h3>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Postal Area Code <span className="text-danger">(*Required)</span></label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={code}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter 5 digit code ex: 10400"
                                                    pattern = '^\d{5}$'
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Postal Area Name <span className="text-danger">(*Required)</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={name}
                                                    onChange={this.handleInput}
                                                    className="form-control"
                                                    placeholder="Enter Area Name"
                                                    minLength="1"
                                                    maxLength="20"
                                                    pattern = '^[a-zA-Z][a-zA-Z0-9.\-\s]{0,19}$'
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
                            { (postal_area)
                                ? <div className="col-xl-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 p-md-3 mt-3">
                                            <div className="cart-detail bg-info p-3 p-md-3">
                                                <p className="text-light font-weight-bold text-center">Postal Area Record Created</p>
                                                <p className="text-light text-center">{postal_area}</p>
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
            toast.warning('Unauthorized Feature. Only for admin use.');
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default CreatePostalArea
