import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import { server_baseURL } from '../../../helpers/data';
import ChangeAddress from './ChangeAddress';
import Poster from '../../Poster';
import { toast } from 'react-toastify';

class AddressLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postal_code: 'sel_default',
            address_arr: [],
            t_headers: ['House Number', 'Street', 'Sub Area', "Resident's Key"],
            area_list: [],
            modal_show: false
        }
        this.component_ref = React.createRef();
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

    fetchAddresses = (postal_code) => {
        axios({
            method: 'post',
            url: `${server_baseURL}/addresses/area`,
            data: {postal_code},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                this.setState({
                    postal_code,
                    address_arr: res.data,
                    modal_show: false
                });
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    handlePostalArea = (event) => {
        this.fetchAddresses(event.target.value);
    }

    toggleModal = () =>{
        this.setState({
            modal_show: !this.state.modal_show
        })
    }

    handleEdit = (event) => {
        let address = this.state.address_arr[event.target.value];
        if(address[2] === '_') {address[2] = ''}
        if(address[3] === '_') {address[3] = ''}
        address[4] = this.state.postal_code;
        console.log(address);
        this.toggleModal();
        this.component_ref.current.setValues(address, this.state.area_list);
        // this.component_ref.current.toggleModal();
    }

    changePostalArea = (postal_code) => {
        this.fetchAddresses(postal_code);
    }

    render() {
        if(localStorage.getItem('user_type') === 'admin'){
            let t_head_style = {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden"
            }
            let special_thead = {
                backgroundColor: "white"
            }
            const {t_headers, address_arr, area_list, postal_code} = this.state;

            return (
                <>
                <Poster type="Address Log" description="view addresses in a postal area" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center ftco-cart">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <div className="text-center">View Addresses of Postal Area</div>
                                    <div className="select-wrap">
                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                        <select
                                            name="postal_code"
                                            value={postal_code}
                                            onChange={this.handlePostalArea}
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
                        { (address_arr.length !== 0)
                            ? <div className="row justify-content-center mt-4">
                                <div className="table-responsive">
                                    <table className="table w-auto">
                                        <thead className="thead-primary" style={t_head_style}>
                                            <tr className="text-center">
                                                <th style={special_thead}></th>
                                                {
                                                    t_headers.map((t_header, idx) => (
                                                        <th key={idx}>{t_header}</th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                address_arr.map( (address, idx) => (
                                                    <tr key={address[0]} className="text-center">
                                                        <td><button className="btn btn-sm btn-info py-2 px-4" onClick={this.handleEdit} value={idx}>Edit</button></td>
                                                        {
                                                            address.slice(1).map( (el, idx) => (
                                                                <td key={idx} className='product-name text-dark'>{el}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : (postal_code !== 'sel_default')
                            ? <div className="row">
                                <h5 className="font-italic"><small className="text-muted">No Address records in this postal area</small></h5>
                            </div>
                            : <></>
                        }
                    </div>
                </section>
                <ChangeAddress show={this.state.modal_show} toggle={this.toggleModal} changePostalArea={this.changePostalArea} ref={this.component_ref}/>
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

export default AddressLog
