import React, { Component } from 'react'
import '../../custom_styles/checkboxstyle.css'
import {handleRequestError} from '../../helpers/error_handler';
const axios = require('axios');

class AddressFormRP extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            receiver_name: '',
            receiver_number: '',
            rec_postal_area: 'sel_default',
            sender_name: '',
            sender_number: '',
            sen_postal_area: 'sel_default',  
            price: '',
            speed_post: false,       
            area_list: []
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/postal-areas', {headers: {'X-Requested-With': 'XMLHttpRequest'}})
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

    addDecimals = (event) => {
        event.target.value = parseFloat(event.target.value).toFixed(2);
        // console.log(this.state.price);
        this.setState(
            {
            price: event.target.value
            }, 
            () => {
                console.log(`callback fn... ${this.state.price}`);
            }
        );
    }

    markSpeedPost = (event) => {
        this.setState({
            speed_post: !this.state.speed_post
        })
    }

    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        let post_obj = {
            receiver: {number: this.state.receiver_number, postal_area: this.state.rec_postal_area},
            sender: {number: this.state.sender_number, postal_area: this.state.sen_postal_area}
        }
        let rp_details = {
            receiver_name: this.state.receiver_name,
            sender_name: this.state.sender_name,
            price: this.state.price,
            speed_post: this.state.speed_post
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/registered-post/address',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);                
                this.props.loadConfirmation(res.data, rp_details);               
            })
            .catch(err => {
                console.log(err);
                this.props.loadConfirmation();
                handleRequestError(err);
            })
    }

    render() {
        const {receiver_name, receiver_number, rec_postal_area, sender_name, sender_number, sen_postal_area, price, speed_post, area_list} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Fill in Letter Details</h3>
                <div className="row align-items-end">
                    <div className="col-md-6">
                        <h4> Receiver </h4>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="postcodezip">Name (Receiver)</label>
                                <input 
                                    type="text" 
                                    name="receiver_name"
                                    value={receiver_name} 
                                    onChange={this.handleInput}                                
                                    className="form-control" 
                                    placeholder="Enter Reciever's Name"
                                    minLength="1"
                                    maxLength="50"
                                    pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="postcodezip">House Number (Receiver)</label>
                                <input 
                                    type="text" 
                                    name="receiver_number"
                                    value={receiver_number} 
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
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="country">Postal Area (Receiver)</label>
                                <div className="select-wrap">
                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                    <select 
                                        name="rec_postal_area" 
                                        id="" 
                                        value={rec_postal_area} 
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
                                                <option 
                                                    key={area.code} 
                                                    value={`${area.name},${area.code}`}>
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
                    <div className="col-md-6">
                        <h4> Sender </h4>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="postcodezip">Name (Sender)</label>
                                <input 
                                    type="text" 
                                    name="sender_name"
                                    value={sender_name} 
                                    onChange={this.handleInput}                                
                                    className="form-control" 
                                    placeholder="Enter Sender's Name"
                                    minLength="1"
                                    maxLength="50"
                                    pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="postcodezip">House Number (Sender)</label>
                                <input 
                                    type="text" 
                                    name="sender_number"
                                    value={sender_number} 
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
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="country">Postal Area (Sender)</label>
                                <div className="select-wrap">
                                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                    <select 
                                        name="sen_postal_area" 
                                        id="" 
                                        value={sen_postal_area} 
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
                                                <option 
                                                    key={area.code} 
                                                    value={`${area.name},${area.code}`}>
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
                </div>
                <div className="col-md-10">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="postcodezip">Letter Price</label>
                                <input 
                                    type="number" 
                                    name="price"
                                    value={price} 
                                    onChange={this.handleInput}
                                    onBlur={this.addDecimals}                          
                                    min="0"
                                    step="0.01"
                                    max="1000"
                                    className="form-control" 
                                    placeholder="Enter price ex: 16.50"
                                    // pattern = '^[0-9]\d*(?:\.\d{2})?$'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mt-4">
                                <div className="row justify-content-center">
                                    <div className="custom-control custom-checkbox checkbox-xl">                               
                                        <input 
                                        name="speed_post" 
                                        type="checkbox"
                                        id="cb3"
                                        className="custom-control-input"
                                        checked={speed_post}
                                        onChange={this.markSpeedPost}
                                        />
                                        {' '}
                                        <label className="custom-control-label" htmlFor="cb3">Speed Post</label> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="form-group mt-3">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="cart-detail p-3 p-md-3">
                                    <p><button type="submit" className="btn btn-primary py-3 px-4">Submit Details</button></p>
                                </div>
                            </div>
                        </div>	
                    </div>
                </div>
            </form>
        )
    }
}

export default AddressFormRP