import React, { Component } from 'react';
import {handleRequestError} from '../../helpers/error_handler';
const axios = require('axios');

class AddressFormNP extends Component{    

    constructor(props){
        super(props);

        this.state = {
            house_number: '',
            postal_code: 'sel_default',
            price: 0,
            area_list: []            
        };
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

    handleHouseNumber = (event) => {
        this.setState(
            {
            house_number: event.target.value
            }, 
            () => {
                // console.log(`callback fn... ${this.state.house_number}`);
            }
        );
        // console.log(this.state.house_number);
    }

    handlePostalCode = (event) => {
        this.setState({
            postal_code: event.target.value
        });
    }

    handlePrice = (event) => {
        // event.target.value = parseFloat(event.target.value).toFixed(2);
        this.setState({
            price: event.target.value
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

    handleSubmit = (event) => {
        // console.log(this.state);
        event.preventDefault();               
        let post_obj = {
            number: this.state.house_number,
            postal_code: this.state.postal_code
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/addresses/confirm',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);                    
                this.props.loadConfirmation(res.data, this.state.price);               
            })
            .catch(err => {
                console.log(err);                    
                this.props.loadConfirmation();
                handleRequestError(err);
            })
    }

    validate = (event) => {
        // console.log(this.state.house_number);
    }

    render(){
        const {house_number, postal_code, price, area_list} = this.state;
        return(         
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Fill in Letter Details</h3>						
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="postcodezip">House Number</label>
                        <input 
                            type="text" 
                            name="house_number"
                            value={house_number} 
                            onChange={this.handleHouseNumber}
                            onBlur={this.validate}
                            className="form-control" 
                            placeholder="Enter house number ex:123/A"
                            minLength="1"
                            maxLength="50"
                            pattern = '^(?=.*[A-Za-z0-9])[A-Za-z\d\-/,\\]{1,50}$'                            
                            required
                        />
                    </div>
                </div>
                {/* <div className="w-100"></div> */}
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="country">Postal Area</label>
                        <div className="select-wrap">
                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                            <select 
                                name="postal_code"
                                value={postal_code} 
                                onChange={this.handlePostalCode}
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
                                {/* <option value="10400">Moratuwa,10400</option>
                                <option value="11160">Kal-eliya,11160</option>
                                <option value="20400">Peradeniya,20400</option>
                                <option value="80000">Galle,80000</option>
                                <option value="82000">Matara,82000</option>
                                <option value="01000">Maradana,01000</option> */}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="postcodezip">Letter Price</label>
                        <input 
                            type="number" 
                            name="price"
                            value={price} 
                            onChange={this.handlePrice}
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
                {/* <div className="w-100"></div> */}
                <div className="col-md-8">
                    <div className="form-group mt-4">
                        <div className="row">
                            {/* <div className="col-md-7"> */}
                                <div className="cart-detail p-3 p-md-3">
                                    <p><button type="submit" className="btn btn-primary py-3 px-4">Submit Details</button></p>
                                {/* </div> */}
                            </div>
                        </div>	
                    </div>
                </div>
            </form>
        );
    }    
}

export default AddressFormNP;