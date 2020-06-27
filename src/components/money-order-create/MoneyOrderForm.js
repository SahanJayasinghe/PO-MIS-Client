import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';

class MoneyOrderForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sender_name: '',
            order_amount: '',
            receiver_name: '',
            receiver_postal_code: 'sel_default',
            price: '',
            expire_after: '',
            area_list: [{code: '10400', name: 'moratuwa'}, {code: '11160', name: 'kal-eliya'}]
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
        // console.log(typeof this.state.price);
        this.setState(
            {
                [event.target.name]: event.target.value
            }            
        );
    }

    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        let {sender_name, receiver_name, receiver_postal_code, order_amount, expire_after, price} = this.state;
        let posted_location = localStorage.getItem('user_id');
        let post_obj = {
            sender_name, receiver_name, receiver_postal_code,
            amount: order_amount, price, expire_after, posted_location
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/money-order',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);                    
                this.props.loadDetails(res.data);              
            })
            .catch(err => {
                console.log(err);                    
                this.props.loadDetails(null);
                handleRequestError(err);
            })
    }
    
    render() {
        let {sender_name, order_amount, receiver_name, receiver_postal_code, expire_after, price, area_list} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Fill in Money Order Details</h3>
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Sender's Name</label>
                            <input 
                                type="text" 
                                name="sender_name"
                                value={sender_name} 
                                onChange={this.handleInput}                                
                                className="form-control" 
                                placeholder="Enter full name or with initials"
                                minLength="1"
                                maxLength="50"
                                pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Money Order Amount</label>
                            <input 
                                type="number" 
                                name="order_amount"
                                value={order_amount} 
                                onChange={this.handleInput}
                                onBlur={this.addDecimals}                          
                                min="1"
                                step="0.01"
                                max="5000"
                                className="form-control" 
                                placeholder="Enter amount ex: 1825.50"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Receiver's Name</label>
                            <input 
                                type="text" 
                                name="receiver_name"
                                value={receiver_name} 
                                onChange={this.handleInput}                                
                                className="form-control" 
                                placeholder="Enter full name or with initials"
                                minLength="1"
                                maxLength="50"
                                pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="country">Receiver's Postal Area</label>
                            <div className="select-wrap">
                                <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                <select 
                                    name="receiver_postal_code" 
                                    value={receiver_postal_code} 
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
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Price</label>
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
                                placeholder="Enter price ex: 70.50"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="postcodezip">Expire After <span className="text-info">(No. of Months, Maximum 24)</span> </label>
                            <input 
                                type="number" 
                                name="expire_after"
                                value={expire_after} 
                                onChange={this.handleInput}                                
                                className="form-control" 
                                placeholder="Enter the No. of months"
                                min="1"
                                max="24"
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

export default MoneyOrderForm
