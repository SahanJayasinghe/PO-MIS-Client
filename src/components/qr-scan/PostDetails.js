import React, { Component } from 'react'
import axios from 'axios';
import { handleRequestError } from '../../helpers/error_handler';

class PostDetails extends Component {
    constructor(props) {
        super(props)
        console.log('PostDetails Constructor');

        this.state = {
            type: props.type,
            id: props.id,
            post_details: null
            // post_details: {
            //     receiver_address: ['Arthur', '46', 'Mill Rd', 'Hiriwala', 'kal-eliya', '11160'],
            //     // sender_address: null,
            //     sender_address: ['John W.', '121/B', '1st lane', 'rawathawatta', 'Moratuwa', '10400'],                
            //     speed_post: true,                
            //     status: ['on-route-receiver', 'On route to Receiver'],
            //     posted_on: '2020-05-02 10:49:21',
            //     last_location: 'Maradana,01000',
            //     last_update: '2020-05-04 18:03:10'
            // }
        }
    }

    componentDidMount(){
        console.log('PostDetails componentDidMount');
        this.loadPostDetails(this.props.type, this.props.id);
    }

    componentDidUpdate(prevProps){        
        if((prevProps.type !== this.props.type) || (prevProps.id !== this.props.id)){
            console.log('PostDetails componentDidUpdate');
            // this.setState({
            //     type: this.props.type,
            //     id: this.props.id
            // });
            this.loadPostDetails(this.props.type, this.props.id);
        }
    }

    loadPostDetails = (type, id) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/qr-read/post-details',
            data: {type, id},
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);
                this.setState({
                    type,
                    id,
                    post_details: res.data
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({post_details: null});
                handleRequestError(err); 
            })
    }

    handleClick = (event) => {
        let postal_code = localStorage.getItem('user_id');
        axios({
            method: 'put',
            url: 'http://localhost:5000/qr-read',
            data: {type: this.state.type, id: this.state.id, post_office: postal_code},
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);
                let new_details = this.state.post_details;
                let postal_area = localStorage.getItem('postal_area');
                // let postal_area = 'Moratuwa';
                new_details.last_location = `${postal_area},${res.data.last_location}`;
                new_details.last_update = res.data.last_update;
                this.setState({
                    post_details: new_details
                });
            })
            .catch(err => {
                console.log(err);                
                this.props.handleRequestError(err); 
            })
    }
    
    render() {
        console.log('PostDetails Render');
        console.log(this.state);
        if(this.state.post_details){

            let post_type = null;
            if (this.state.type === 'RegPost') { post_type = 'Registered Post'; }
            else if (this.state.type === 'Parcel') { post_type = 'Parcel Post' }
            else if (this.state.type === 'NormalPost') { post_type = 'Normal Post' }

            let {receiver, sender, speed_post} = this.state.post_details;
            let {status, posted_on, last_location, last_update} = this.state.post_details;

            let details;
            let should_update;
            if(this.state.type === 'NormalPost'){
                details = <></>;
                should_update = false;
            }
            else {
                details = <div className="cart-detail p-3 p-md-3">
                            <span className="d-flex"> Delivery Status <span className="font-weight-bold"> {`: ${status[1]}`} </span> </span>
                            <span className="d-flex"> Last Updated At <span className="font-weight-bold">  {`: ${last_update}`} {last_location} </span> </span>
                            <span className="d-flex"> Posted On <span className="font-weight-bold"> {`: ${posted_on}`} </span> </span>
                        </div>;
                
                let status_check = (['on-route-receiver', 'on-route-sender'].includes(status[0]));            
                let post_office = localStorage.getItem('user_id');
                let post_office_check = (last_location.split(',')[1] !== post_office);
                should_update = (status_check && post_office_check);
            }
            
            return (
                <div className="col-md-8">
                    <div className="d-flex row justify-content-center">
                    <h3 className="billing-heading mb-3 d-inline-block">{post_type}</h3>
                    {
                        (speed_post)
                        ? <span className="align-top badge badge-pill badge-danger"> Speed Post </span>
                        : <></>
                    }
                    </div>                     
                    {details}
                    <div className="row mt-3 pt-2">                                       
                        <div className="col-md-12 mb-4">
                            <div className="row justify-content-center">                  
                                <div className="col-md-6">
                                    <div className="cart-detail cart-total p-3 p-md-3">
                                        <h3 className="billing-heading mb-3 text-center">Receiver Address</h3>                                    
                                        {
                                            receiver.map((el, idx) => (
                                                <p key={idx} className="d-flex"> <span>{el},</span> </p>
                                            ))
                                        }                                
                                    </div>
                                </div>
                                {
                                    (sender) ?
                                        <div className="col-md-6">
                                            <div className="cart-detail cart-total p-3 p-md-3">
                                                <h3 className="billing-heading mb-3 text-center">Sender Address</h3>                                            
                                                {
                                                    sender.map((el, idx) => (
                                                        <p key={idx} className="d-flex"> <span>{el},</span> </p>
                                                    ))
                                                }                                
                                            </div>
                                        </div>
                                        : <></>
                                }                        
                            </div>
                        </div>
                        {
                            (should_update) ?
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="cart-detail p-3 p-md-3">
                                                <p><button onClick={this.handleClick} className="btn btn-primary py-3 px-4">Update Location</button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }            
                    </div>
                </div>
            )
        }
        else{
            return(
                <></>
            )
        }
    }
}

export default PostDetails
