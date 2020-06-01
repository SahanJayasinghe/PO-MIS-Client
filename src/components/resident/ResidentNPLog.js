import React, { Component } from 'react'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';

class ResidentNPLog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            resident_id: props.resident_id,
            resident_key: props.resident_key,
            np_obj: null
        }
    }

    fetchNormalPosts = (resident_id, resident_key) => {
        axios({
            method: 'post',
            url: `http://localhost:5000/resident-details/normal-posts`,
            data: {resident_id, resident_key},
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);
                this.setState({resident_id, resident_key, np_obj: res.data});                      
            })
            .catch(err => {
                console.log(err);                              
                handleRequestError(err);
            })
    }

    componentDidMount(){
        let {resident_id, resident_key} = this.state;
        this.fetchNormalPosts(resident_id, resident_key);
    }

    componentDidUpdate(prevProps){
        let {resident_id, resident_key} = this.props;
        if(prevProps.resident_id !== resident_id){
            this.fetchNormalPosts(resident_id, resident_key);
        }
    }
    
    render() {
        const {np_obj} = this.state;
        return (               
            <div className="row justify-content-center">
                { (np_obj)
                    ? <div className="col-lg-4 alert alert-success" role="alert">
                        <h4 className="font-weight-bold text-center mb-3">Normal Post Counter</h4>
                        <div className="row justify-content-between border-bottom">
                            <span className="d-flex ml-4 d-inline"># Letters On Route :</span>
                            <span className="d-flex mr-4 d-inline">{np_obj.on_route}</span>
                        </div>
                        <div className="row justify-content-between border-bottom">
                            <span className="d-flex ml-4 d-inline"># Letters Delivered :</span>
                            <span className="d-flex mr-4 d-inline">{np_obj.delivered}</span>
                        </div>
                        <div className="row justify-content-between border-bottom">
                            <span className="d-flex ml-4 d-inline"># Letters Failed to Deliver :</span>
                            <span className="d-flex mr-4 d-inline">{np_obj.failed}</span>
                        </div>
                    </div>
                    : <h5 className="font-italic mt-4">
                        <small className="text-muted">No Records Found</small>
                    </h5>
                }
            </div>           
        )
    }
}

export default ResidentNPLog
