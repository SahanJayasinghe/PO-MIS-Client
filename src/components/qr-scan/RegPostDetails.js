import React, { Component } from 'react'
import axios from 'axios';
import { handleRequestError } from '../../helpers/error_handler';
import RegPostRouteInfo from './RegPostRouteInfo';
import { server_baseURL } from '../../helpers/data';

class RegPostDetails extends Component {
    constructor(props) {
        super(props)
        console.log('RegPostDetails Constructor');

        this.state = {
            id: props.id,
            post_details: null,
            modal_show: false
        }
        this.component_ref = React.createRef();
    }

    toggleModal = () =>{
        this.setState({
            modal_show: !this.state.modal_show
        })
    }

    loadPostDetails = (id) => {
        let header_obj = {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')};
        axios.get(`${server_baseURL}/registered-post/${id}`, {headers: header_obj})
            .then(res => {
                console.log(res);
                this.setState({
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

    componentDidMount() {
        console.log('RegPostDetails componentDidMount');
        this.loadPostDetails(this.props.id);
    }

    componentDidUpdate(prevProps) {
        console.log('RegPostDetails componentDidUpdate');
        if (prevProps.id !== this.props.id){
            console.log('RegPostDetails componentDidUpdate if block');
            this.loadPostDetails(this.props.id);
        }
    }

    handleUpdate = (event) => {
        let post_office = localStorage.getItem('user_id');
        let {id} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/registered-post/location-update`,
            data: {id, post_office},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
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
                this.component_ref.current.fetchRouteInfo(id);
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    callBackEnd = (endpoint) => {
        let post_office = localStorage.getItem('user_id');
        let {id} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/registered-post/${endpoint}`,
            data: {id, post_office},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                let new_details = this.state.post_details;
                new_details.status = res.data.status;
                new_details.last_update = res.data.last_update;
                this.setState({
                    post_details: new_details
                });

                if(endpoint === 'send-back'){
                    this.component_ref.current.fetchRouteInfo(id);
                }
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    handleReturn = (event) => {
        this.callBackEnd('send-back');
    }

    handleDiscard = (event) => {
        this.callBackEnd('discard');
    }

    render() {
        console.log('RegPostDetails Render');
        // console.log(this.state);

        if (this.state.post_details){
            let post_office = localStorage.getItem('user_id');
            let {receiver, sender, speed_post, status} = this.state.post_details;
            let {posted_on, last_location, last_update, attempts_receiver, attempts_sender} = this.state.post_details;

            let status_check = (['on-route-receiver', 'on-route-sender'].includes(status[0]));
            let last_po = last_location.split(',')[1];
            let post_office_check = (last_po !== post_office);
            let should_update = (status_check && post_office_check);
            let should_return = (status[0] === 'receiver-unavailable' && attempts_receiver > 0 && receiver[receiver.length - 1] === post_office);
            let should_discard = (status[0] === 'sender-unavailable' && attempts_sender > 0 && sender[sender.length - 1] === post_office);

            return (
                <>
                <div className="col-md-8">
                    <div className="row justify-content-center">
                        <h3 className="billing-heading mb-3 d-inline-block">Registered Post
                        {(speed_post)
                            ? <span className="align-top badge badge-pill font-weight-lighter badge-danger ml-2"> Speed Post </span>
                            : <></>
                        }
                        </h3>
                    </div>
                    <div className="row justify-content-around">
                        <div className="col-md-8">
                            <div className="cart-detail p-3 p-md-3 ml-4">
                                <span className="row d-flex"> Delivery Status :<span className="font-weight-bold ml-2"> {status[1]} </span> </span>
                                <span className="row d-flex"> Last Updated At :<span className="font-weight-bold ml-2"> {`${last_update}  ${last_location}`} </span> </span>
                                { (status[0] !== 'on-route-receiver')
                                    ? <span className="row d-flex"> # Delivery Attempts to Receiver :<span className="font-weight-bold ml-2"> {attempts_receiver} </span> </span>
                                    : <></>
                                }
                                { ( ['sender-unavailable', 'sent-back', 'failed'].includes(status[0]) )
                                    ? <span className="row d-flex"> # Delivery Attempts to Sender :<span className="font-weight-bold ml-2"> {attempts_sender} </span> </span>
                                    : <></>
                                }
                                <span className="row d-flex"> Posted At :<span className="font-weight-bold ml-2"> {posted_on} </span> </span>
                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="cart-detail p-3 p-md-3 py-4">
                                <button className="btn btn-md btn-info px-4 py-3" onClick={this.toggleModal}>Route Info</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 pt-2">
                        <div className="col-md-12 mb-4">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="cart-detail cart-total p-3 p-md-3">
                                        <h3 className="billing-heading mb-3 text-center">Receiver Address</h3>
                                        {
                                            receiver.map((el, idx) => (
                                                <p key={idx} className="d-flex font-weight-bold"> <span>{el},</span> </p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="cart-detail cart-total p-3 p-md-3">
                                        <h3 className="billing-heading mb-3 text-center">Sender Address</h3>
                                        {
                                            sender.map((el, idx) => (
                                                <p key={idx} className="d-flex font-weight-bold"> <span>{el},</span> </p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(should_update) ?
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
                        {(should_return) ?
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
                        {(should_discard) ?
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
                <RegPostRouteInfo show={this.state.modal_show} toggle={this.toggleModal} id={this.state.id} ref={this.component_ref} />
                </>
            )
        }
        else{
            return(
                <></>
            )
        }
    }
}

export default RegPostDetails