import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import { server_baseURL } from '../../../helpers/data';
import { toast } from 'react-toastify';

class ChangePostalArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: '',
            name: '',
            prev_code: null,
            prev_name: null
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setValues = (prevPostalArea) => {
        let prev_pa_list = prevPostalArea.split(',');
        this.setState({
            code: prev_pa_list[1],
            name: prev_pa_list[0],
            prev_code: prev_pa_list[1],
            prev_name: prev_pa_list[0]
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let {code, name, prev_code} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/postal-areas`,
            data: {code, name, prev_code},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                this.props.changeProvince(code);
                toast.info(res.data);
            })
            .catch(err => {
                console.log(err);
                // this.props.toggle();
                handleRequestError(err);
            })
    }

    render() {
        const {code, name} = this.state;
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <h4 className="modal-title w-100 font-weight-bold text-center">Change Postal Area</h4>
                    <button type="button" className="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} className="billing-form">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="postcodezip">Postal Area Code</label>
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
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="postcodezip">Postal Area Name</label>
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
                </Modal.Body>
            </Modal>
        )
    }
}

export default ChangePostalArea
