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

    get_route = (type) => {
        let route;
        if(type === 'NormalPost') {route = `normal-post`}
        else if(type === 'RegPost') {route = `registered-post`}
        else if(type === 'Parcel') {route = `parcel-post`}
        return route;
    }

    loadPostDetails = (type, id) => {
        let route = this.get_route(type);
        axios.get(`http://localhost:5000/${route}/${id}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}})          
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

    handleUpdate = (event) => {
        let post_office = localStorage.getItem('user_id');
        let {id, type} = this.state;
        let route = this.get_route(type);       
        axios({
            method: 'put',
            url: `http://localhost:5000/${route}/location-update`,
            data: {id, post_office},
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
                handleRequestError(err); 
            })
    }

    handleReturn = (event) => {
        let post_office = localStorage.getItem('user_id');
        let {id, type} = this.state;
        if(type === 'RegPost') {        
            axios({
                method: 'put',
                url: `http://localhost:5000/registered-post/send-back`,
                data: {id, post_office},
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
                .then(res => {
                    console.log(res);
                    let new_details = this.state.post_details;
                    new_details.status = res.data.status;
                    new_details.last_update = res.data.last_update;
                    this.setState({
                        post_details: new_details
                    });
                })
                .catch(err => {
                    console.log(err);                
                    handleRequestError(err); 
                })
        }
    }

    handleDiscard = (event) => {
        
    }
    
    render() {
        console.log('PostDetails Render');
        console.log(this.state);

        if(this.state.post_details){
            let post_office = localStorage.getItem('user_id');
            let post_type = null;
            if (this.state.type === 'RegPost') { post_type = 'Registered Post'; }
            else if (this.state.type === 'Parcel') { post_type = 'Parcel Post' }
            else if (this.state.type === 'NormalPost') { post_type = 'Normal Post' }

            let {receiver, sender, speed_post, status} = this.state.post_details;
            let {posted_on, last_location, last_update, attempts_receiver, attempts_sender} = this.state.post_details;
            
            let details;
            let should_update;
            let should_return;
            let should_discard;

            if(this.state.type === 'NormalPost'){
                details = <></>;
                should_update = false;
                should_return = false;
                should_discard = (receiver[receiver.length - 1] === post_office);
            }

            else if(this.state.type === 'RegPost'){
                details = <div className="row cart-detail p-3 p-md-3 ml-4">
                    <span className="d-flex"> Delivery Status :<span className="font-weight-bold ml-2"> {status[1]} </span> </span>
                    <span className="d-flex"> Last Updated At :<span className="font-weight-bold ml-2"> {`${last_update}  ${last_location}`} </span> </span>
                    { (status[0] !== 'on-route-receiver')
                        ? <span className="d-flex"> # Delivery Attempts to Receiver :<span className="font-weight-bold ml-2"> {attempts_receiver} </span> </span>
                        : <></>
                    }
                    { ( ['sender-unavailable', 'sent-back', 'failed'].includes(status[0]) )
                        ? <span className="d-flex"> # Delivery Attempts to Sender :<span className="font-weight-bold ml-2"> ${attempts_sender} </span> </span>
                        : <></>
                    }
                    <span className="d-flex"> Posted At :<span className="font-weight-bold ml-2"> {posted_on} </span> </span>
                </div>;
                
                let status_check = (['on-route-receiver', 'on-route-sender'].includes(status[0]));                
                let post_office_check = (last_location.split(',')[1] !== post_office);
                should_update = (status_check && post_office_check);
                should_return = (status[0] === 'receiver-unavailable' && attempts_receiver > 0 && receiver[receiver.length - 1] === post_office);
                should_discard = (status[0] === 'sender-unavailable' && attempts_sender > 0 && sender[sender.length - 1] === post_office);
            }

            else{
                let {posted_location} = this.state.post_details;
                details = <div className="row cart-detail p-3 p-md-3 ml-4">
                    <span className="d-flex"> Delivery Status :<span className="font-weight-bold ml-2"> {status[1]} </span> </span>
                    <span className="d-flex"> Last Updated At :<span className="font-weight-bold ml-2">  {`${last_update}  ${last_location}`} </span> </span>
                    { (status[0] !== 'on-route-receiver')
                        ? <span className="d-flex"> # Delivery Attempts :<span className="font-weight-bold ml-2"> {attempts_receiver} </span> </span>
                        : <></>
                    }                    
                    <span className="d-flex"> Posted At :<span className="font-weight-bold ml-2"> {`${posted_on}  ${posted_location}`} </span> </span>
                </div>;

                let post_office_check = (last_location.split(',')[1] !== post_office);
                should_update = (status[0] === 'on-route-receiver' && post_office_check);
                should_return = false;
                should_discard = (status[0] === 'receiver-unavailable' && attempts_receiver > 0 && receiver[receiver.length - 1] === post_office);
            }
            
            return (
                <div className="col-md-8">
                    <div className="row justify-content-center">
                        <h3 className="billing-heading mb-3 d-inline-block">{post_type}
                        {
                            (speed_post)
                            ? <span className="align-top badge badge-pill font-weight-lighter badge-danger ml-2"> Speed Post </span>
                            : <></>
                        }
                        </h3>
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
                                                <p><button onClick={this.handleUpdate} className="btn btn-primary py-3 px-4">Update Location</button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            (should_return) ?
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="cart-detail p-3 p-md-3">
                                                <p><button onClick={this.handleReturn} className="btn btn-primary py-3 px-4">Return to Sender</button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            (should_discard) ?
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="cart-detail p-3 p-md-3">
                                                <p><button onClick={this.handleDiscard} className="btn btn-primary py-3 px-4">Discard</button></p>
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
