import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';
import { server_baseURL } from '../../helpers/data';

class ParcelRouteInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            delivery_route: []
        }
    }

    fetchRouteInfo = (id) => {
        let headers = {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')};
        axios.get(`${server_baseURL}/parcel-post/route-info/${id}`, {headers})
            .then(res => {
                console.log(res);
                this.setState({
                    id,
                    delivery_route: res.data
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    delivery_route: []
                });
                handleRequestError(err);
            })
    }

    componentDidMount() {
        this.fetchRouteInfo(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id){
            this.fetchRouteInfo(this.props.id);
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <h4 className="modal-title w-100 font-weight-bold text-center">Route Infromation</h4>
                    <button type="button" className="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h4 className="billing-heading mt-2 mb-2 text-center text-info">Delivery Route</h4>
                            {(this.state.delivery_route.length)
                                ? <>
                                    <div className="row border-bottom border-info py-2 d-flex justify-content-between d-inline-block">
                                        <span className="font-weight-bold mx-4 text-capitalize">Location</span>
                                        <span className="font-weight-bold mx-4 text-capitalize">Updated At</span>
                                    </div>
                                    {
                                        this.state.delivery_route.map(el => (
                                            <div key={el[2]} className="row border-bottom py-2 d-flex justify-content-between d-inline-block">
                                                <span className="text-body mr-2 text-capitalize">{el[0]}, {el[1]}</span>
                                                <span className="text-body mr-2 text-capitalize">{el[2]}</span>
                                            </div>
                                        ))
                                    }
                                    {/* <div className="row border-bottom py-2 d-flex justify-content-between d-inline-block">
                                        <span className="text-body mr-2 text-capitalize">moratuwa, 10400</span>
                                        <span className="text-body mr-2 text-capitalize">2020-06-10 09:56:21</span>
                                    </div> */}
                                </>
                                : <h5 className="font-italic mb-4">
                                    <small className="text-muted">No records about the delivery route</small>
                                </h5>
                            }
                            {/* <div className="row border-bottom py-2 d-flex justify-content-between d-inline-block">
                                <span className="text-body mr-2 text-capitalize">moratuwa, 10400</span>
                                <span className="text-body mr-2 text-capitalize">2020-06-10 09:56:21</span>
                            </div> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ParcelRouteInfo
