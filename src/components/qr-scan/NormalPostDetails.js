import React, { Component } from 'react'
import axios from 'axios';
import { handleRequestError } from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';

class NormalPostDetails extends Component {
    constructor(props) {
        super(props)
        console.log('NormalPostDetails Constructor');

        this.state = {
            id: props.id,
            post_details: null
        }
    }

    loadPostDetails = (id) => {
        let header_obj = {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')};
        axios.get(`${server_baseURL}/normal-post/${id}`, {headers: header_obj})
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
        console.log('NormalPostDetails componentDidMount');
        this.loadPostDetails(this.props.id);
    }

    componentDidUpdate(prevProps) {
        console.log('NormalPostDetails componentDidUpdate');
        // this.loadPostDetails(this.props.id);
        if (prevProps.id !== this.props.id){
            console.log('NormalPostDetails componentDidUpdate if block');
            this.loadPostDetails(this.props.id);
        }
    }

    handleDiscard = (event) => {
        let post_office = localStorage.getItem('user_id');
        let {id} = this.state;
        axios({
            method: 'put',
            url: `${server_baseURL}/normal-post/discard`,
            data: {id, post_office},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);
                let new_details = this.state.post_details;
                new_details.on_route_count = res.data.on_route_count;
                new_details.failed_delivery_count = res.data.failed_delivery_count;
                this.setState({post_details: new_details});
                alert('Normal Post discarded. Discarded Letter count incremented');
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }

    render() {
        console.log('NormalPostDetails Render');
        // console.log(this.state);

        if (this.state.post_details){
            let post_office = localStorage.getItem('user_id');
            let {address, on_route_count, delivered_count, failed_delivery_count} = this.state.post_details;
            let should_discard = (address[address.length - 1] === post_office && on_route_count > 0);

            return (
                <div className="col-md-8">
                    <div className="row justify-content-center">
                        <h3 className="billing-heading d-inline-block">Normal Post</h3>
                    </div>
                    <div className="row cart-detail p-3 p-md-3 ml-4">
                        <span className="d-flex text-body"># On Route Letters: <span className="font-weight-bold ml-2">{on_route_count}</span></span>
                        <span className="d-flex text-body"># Delivered Letters: <span className="font-weight-bold ml-2">{delivered_count}</span></span>
                        <span className="d-flex text-body"># Discarded Letters: <span className="font-weight-bold ml-2">{failed_delivery_count}</span></span>
                    </div>
                    <div className="row mt-3 pt-2">
                        <div className="col-md-12 mb-4">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="cart-detail cart-total p-3 p-md-3">
                                        <h3 className="billing-heading mb-3 text-center">Receiver Address</h3>
                                        {
                                            address.map((el, idx) => (
                                                <p key={idx} className="d-flex font-weight-bold"> <span>{el},</span> </p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
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
            )
        }
        else{
            return(
                <></>
            )
        }
    }
}

export default NormalPostDetails
