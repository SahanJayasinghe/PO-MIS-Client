import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import QRScan from './QRScan'
import PostDetails from './PostDetails'
import Poster from '../Poster';

class OnRouteUpdate extends Component {
    constructor(props) {
        super(props)
        console.log('OnRouteUpdate constructor');
        this.state = {
            type: null,
            id: null,
            load_post_details: false
        }
    }

    getScanResults = (type, id, load_post_details) => {
        console.log('OnRouteUpdate getScanResults');
        if((load_post_details === true) || (load_post_details !== this.state.load_post_details)){
            this.setState({
                type, 
                id,
                load_post_details
            });
        }
    }
    
    render() {
        console.log('OnRouteUpdate render');
        console.log(localStorage);
        if(localStorage.getItem('user_type') === 'post_office'){        
            let {type, id, load_post_details} = this.state;
            return (
                <>
                <Poster type='QR Scan' description='Scan QR Code - Update Location' />
                <section className="ftco-section">
                    <div className="container p-3 p-md-4">
                        <div className="row justify-content-center">
                            <div className="col-md-6 bg-dark cart-detail p-3 p-md-3">
                                <span className="d-flex text-light font-weight-bold">Scan the QR Code attached to the post item using the web cam </span>
                                <span className="d-flex text-light font-weight-bold">Update the location of the post if it is registered or a parcel</span>
                            </div>
                        </div>
                        <hr />                 
                        <div className="row justify-content-center">                        
                            <QRScan getScanResults={this.getScanResults}/>
                            {
                                (load_post_details)
                                    ? <PostDetails type={type} id={id} />
                                    : <></>
                            }
                        </div>
                    </div>
                </section>
                </>
            )
        }
        else{
            alert('Unauthorized Feature. Only for officials use.');
            return (
                <Redirect to='/' />                
            )            
        }
    }
}

export default OnRouteUpdate
