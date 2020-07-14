import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import { server_baseURL } from '../../../helpers/data';

class ChangeAddress extends Component {

    constructor(props) {
        super(props)
        console.log('ChangeAddress Constructor');
        this.state = {
            id: '',
            number: '',
            street: '',
            sub_area: '',
            postal_code: 'sel_default',
            area_list: [],
        }
    }

    setValues = (address, area_list) => {
        this.setState({
            id: address[0],
            number: address[1],
            street: address[2],
            sub_area: address[3],
            postal_code: address[4],
            area_list
        })
    }

    // toggleModal = () =>{
    //     this.setState({
    //         modal_show: !this.state.modal_show
    //     })
    // }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let {id, number, street, sub_area, postal_code} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/addresses/${id}`,
            data: {number, street, sub_area, postal_code},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                this.props.changePostalArea(postal_code);
                alert(res.data);
            })
            .catch(err => {
                console.log(err);
                // this.props.toggle();
                handleRequestError(err);
            })
    }

    render() {
        console.log('ChangeAddress Render');
        const {number, street, sub_area, postal_code, area_list} = this.state;
        return (
            <Modal size="lg" show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <h4 className="modal-title w-100 font-weight-bold text-center">Change Address</h4>
                    <button type="button" className="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} className="billing-form mx-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="postcodezip">House Number</label>
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
                                    <label htmlFor="postcodezip">Street</label>
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
                                    <label htmlFor="postcodezip">Sub Area</label>
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
                                        <button type="submit" className="btn btn-primary py-3 px-4">Confirm Details</button>
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

export default ChangeAddress
