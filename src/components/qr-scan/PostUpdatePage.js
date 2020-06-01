import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import QRScan from './QRScan'
import PostDetails from './PostDetails'
import Poster from '../Poster';
import RegPostDetails from './RegPostDetails';
import ParcelDetails from './ParcelDetails';
import NormalPostDetails from './NormalPostDetails';

class PostUpdatePage extends Component {
    constructor(props) {
        super(props)
        console.log('PostUpdatePage constructor');
        this.state = {
            type: null,
            id: null
        }
    }

    getScanResults = (type, id) => {
        console.log('PostUpdatePage getScanResults');
        if(type !== this.state.type || id !== this.state.id){
            this.setState({
                type,
                id
            });
        }
    }
    
    render() {
        console.log('PostUpdatePage render');
        console.log(localStorage);
        if(localStorage.getItem('user_type') === 'post_office'){        
            let {type, id} = this.state;
            return (
                <>
                <Poster type='QR Scan' description='Scan QR Code of a postal item' />
                <section className="ftco-section">
                    <div className="container p-3 p-md-4">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6 bg-dark cart-detail p-3 p-md-3">
                                <span className="d-flex text-light font-weight-bold">Scan the QR Code attached to the post item using the web cam </span>
                                <span className="d-flex text-light font-weight-bold">Update the location of the posts on route</span>
                                <span className="d-flex text-light font-weight-bold">Return Registered post item if the Receiver is unavailable</span>
                                <span className="d-flex text-light font-weight-bold">Discard post item if it is undeliverable</span>
                            </div>
                        </div>
                        <hr />                 
                        <div className="row justify-content-center">                        
                            <QRScan getScanResults={this.getScanResults}/>
                            {(type === 'RegPost')
                                ? <RegPostDetails id={id} />
                                : <></>
                            }
                            {(type === 'Parcel')
                                ? <ParcelDetails id={id} />
                                : <></>
                            }
                            {(type === 'NormalPost')
                                ? <NormalPostDetails id={id} />
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

export default PostUpdatePage
