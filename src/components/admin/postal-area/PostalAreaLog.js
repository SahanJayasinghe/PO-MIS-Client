import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {handleRequestError} from '../../../helpers/error_handler';
import ChangePostalArea from './ChangePostalArea';
import Poster from '../../Poster';
import { server_baseURL } from '../../../helpers/data';

class PostalAreaLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            province: 'sel_default',
            res_data: null,
            modal_show: false
        }
        this.component_ref = React.createRef();
    }

    toggleModal = () =>{
        this.setState({
            modal_show: !this.state.modal_show
        })
    }

    fetchProvincialPA = (province) => {
        axios({
            method: 'post',
            url: `${server_baseURL}/postal-areas/province`,
            data: {province},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                // console.log(res);
                this.setState({
                    province,
                    res_data: res.data,
                    modal_show: false
                });
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    handleProvince = (event) => {
        this.fetchProvincialPA(event.target.value);
    }

    changeProvince = (code) => {
        let province = (code[0] === '0') ? '1' : code[0];
        this.fetchProvincialPA(province);
    }

    handelEdit = (event) => {
        console.log(event.target.value);
        this.toggleModal();
        this.component_ref.current.setValues(event.target.value);
    }

    render() {
        if(localStorage.getItem('user_type') === 'admin'){
            let {province, res_data} = this.state;
            let view_log = (res_data !== null && Object.keys(res_data).length !== 0);
            let province_list = ['Western', 'Central', 'Eastern', 'Northern', 'North Central', 'North Western', 'Sabaragamuwa', 'Southern', 'Uva'];
            let key_list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            let nav_list = ['a', 'e', 'i', 'm', 'q', 'u'];

            return (
                <>
                <Poster type="Postal Area Log" description="view postal areas in a province" />
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center ftco-cart">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <div className="text-center">View Postal Areas of the Province</div>
                                    <div className="select-wrap">
                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                        <select
                                            name="province"
                                            value={province}
                                            onChange={this.handleProvince}
                                            title="Choose a Province"
                                            className="form-control"
                                            required
                                        >
                                            <option value="sel_default" disabled>Select a postal area</option>
                                            {
                                                province_list.map( (province, idx) => (
                                                    <option key={idx+1} value={idx+1}>
                                                        {province} Province
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        { (view_log) ?
                            <>
                            <div className="row justify-content-end">
                                <span className="font-weight-bold mr-3 text-success">
                                    &#10004; <span className="text-dark font-weight-normal">- has Postal Account</span>
                                </span>
                                <span className="font-weight-bold ml-2 text-danger">
                                    &#10006; <span className="text-dark font-weight-normal">- don't have Postal Account</span>
                                </span>
                            </div>
                            <div className="row">
                                <div className="col-md-2 overflow-auto">
                                    <nav id="navbar-example3" className="navbar navbar-light bg-light flex-column">
                                        {/* <a className="navbar-brand" href="#">Navbar</a> */}
                                        {/* <nav className="nav flex-column"> */}
                                            <a className="nav-link active" href="#a">A - D</a>
                                            <a className="nav-link" href="#e">E - H</a>
                                            <a className="nav-link" href="#i">I - L</a>
                                            <a className="nav-link" href="#m">M - P</a>
                                            <a className="nav-link" href="#q">Q - T</a>
                                            <a className="nav-link" href="#u">U - Z</a>
                                        {/* </nav> */}
                                    </nav>
                                </div>
                                <div className="col-md-10">
                                    <div data-target="#navbar-example3">
                                        {
                                            key_list.map(key => (
                                                (nav_list.includes(key))
                                                ? <div id={key} key={key}>
                                                    { (res_data.hasOwnProperty(key))
                                                        ? <div className="cart-detail cart-total p-2 p-md-2 mt-3 bg-light" key={key}>
                                                            <h4 className="text-uppercase">{key}</h4>
                                                            <div className="row justify-content-around">
                                                                { res_data[key].map(postal_area => (
                                                                    <div key={postal_area.code} className="col-md-4 border-bottom py-2 mr-4 d-flex justify-content-between d-inline-block">
                                                                        <span className="font-weight-bold mr-2 text-capitalize">{postal_area.name}</span>
                                                                        <span className="font-weight-bold mr-2">{postal_area.code}</span>
                                                                        { (postal_area.hasAcc === '1')
                                                                            ? <span className="font-weight-bold mr-2 text-success">&#10004;</span>
                                                                            : <span className="font-weight-bold mr-2 text-danger">&#10006;</span>

                                                                        }
                                                                        <button className="btn btn-sm btn-info px-4" value={`${postal_area.name},${postal_area.code}`} onClick={this.handelEdit}>Edit</button>
                                                                    </div>
                                                                ))
                                                                }
                                                            </div>
                                                        </div>
                                                        : <></>
                                                    }
                                                </div>
                                                :<div key={key}>
                                                    { (res_data.hasOwnProperty(key))
                                                        ? <div className="cart-detail cart-total p-2 p-md-2 mt-3 bg-light">
                                                            <h4 className="text-uppercase">{key}</h4>
                                                            <div className="row justify-content-around">
                                                                { res_data[key].map(postal_area => (
                                                                    <div key={postal_area.code} className="col-md-4 border-bottom py-2 mr-4 d-flex justify-content-between d-inline-block">
                                                                        <span className="font-weight-bold mr-2 text-capitalize">{postal_area.name}</span>
                                                                        <span className="font-weight-bold mr-2">{postal_area.code}</span>
                                                                        { (postal_area.hasAcc === '1')
                                                                            ? <span className="font-weight-bold mr-2 text-success">&#10004;</span>
                                                                            : <span className="font-weight-bold mr-2 text-danger">&#10006;</span>

                                                                        }
                                                                        <button className="btn btn-sm btn-info px-4" value={`${postal_area.name},${postal_area.code}`} onClick={this.handelEdit}>Edit</button>
                                                                    </div>
                                                                ))

                                                                }
                                                            </div>
                                                        </div>
                                                        : <></>
                                                    }
                                                </div>
                                            ))
                                        }
                                        {/* <div id="list-item-1">
                                            <h4>M</h4>
                                            <div className="row justify-content-around">
                                                <div className="col-md-4 border-bottom py-2 mr-4 d-flex justify-content-between d-inline-block">
                                                    <span className="font-weight-bold mr-2">mirigama</span>
                                                    <span className="font-weight-bold mr-2">11200</span>
                                                    <span className="font-weight-bold mr-2 text-success">&#10004;</span>
                                                    <button className="btn btn-sm btn-info px-4">Edit</button>
                                                </div>
                                                <div className="col-md-4 border-bottom py-2 mr-4 d-flex justify-content-between d-inline-block">
                                                    <span className="font-weight-bold mr-2">mirigama</span>
                                                    <span className="font-weight-bold mr-2">11200</span>
                                                    <button className="btn btn-sm btn-info px-4">Edit</button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            </>
                            : (province !== 'sel_default')
                            ? <div className="row">
                                <h5 className="font-italic"><small className="text-muted">No Postal Area records in this province</small></h5>
                            </div>
                            : <></>
                        }
                    </div>
                </section>
                <ChangePostalArea show={this.state.modal_show} toggle={this.toggleModal} changeProvince={this.changeProvince} ref={this.component_ref}/>
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

export default PostalAreaLog
