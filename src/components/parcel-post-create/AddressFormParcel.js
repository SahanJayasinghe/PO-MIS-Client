import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';

class AddressFormParcel extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            receiver_name: '',
            house_number: '',
            postal_area: 'sel_default',
            payment: '',
            descript: '',
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
        // console.log(this.state.payment);
        this.setState(
            {
            payment: event.target.value
            }, 
            () => {
                console.log(`callback fn... ${this.state.payment}`);
            }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let post_obj = {
            number: this.state.house_number,
            postal_area: this.state.postal_area
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/parcel-post/address',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);                    
                this.props.loadConfirmation(res.data, this.state.receiver_name, this.state.payment, this.state.descript);               
            })
            .catch(err => {
                console.log(err);                    
                this.props.loadConfirmation();
                handleRequestError(err);
            })
    }

    render() {
        const {receiver_name, house_number, postal_area, payment, descript, area_list} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="billing-form">
                <h3 className="mb-4 billing-heading">Fill in Parcel Details</h3>
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="postcodezip">Receiver Name</label>
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
                {/* <div className="w-100"></div> */}
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="country">Postal Area</label>
                        <div className="select-wrap">
                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                            <select 
                                name="postal_area"                                 
                                value={postal_area} 
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
                        <label htmlFor="postcodezip">Parcel Payment</label>
                        <input 
                            type="number" 
                            name="payment"
                            value={payment} 
                            onChange={this.handleInput}
                            onBlur={this.addDecimals}                          
                            min="0"
                            step="0.01"
                            max="1000"
                            className="form-control" 
                            placeholder="Enter amount ex: 16.50"
                            // pattern = '^[0-9]\d*(?:\.\d{2})?$'
                            required
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="postcodezip">Parcel Description</label>
                        <textarea
                            name="descript"
                            value={descript} 
                            onChange={this.handleInput}                            
                            className="form-control" 
                            placeholder="any notes..." 
                            minLength="1"
                            maxLength="1024"                           
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
        )
    }
}

export default AddressFormParcel