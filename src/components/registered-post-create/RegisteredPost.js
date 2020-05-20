import React, { Component } from 'react'
import AddressFormRP from './AddressFormRP'
import ConfirmRP from './ConfirmRP'
import QRCode from '../QRCode'
import Poster from '../Poster'

class RegisteredPost extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            confirmation: <div></div>,
            qrcode: <div></div>
        }
    }   

    loadConfirmation = (address_obj, rp_details) => {
        // address_obj contains receiver object and sender object
        if (address_obj === undefined){
            this.setState({
                confirmation: <div></div>,
                qrcode: <div></div>
            });
        }
        else{
            this.setState({
                confirmation: <ConfirmRP 
                    receiver={address_obj.receiver}
                    sender={address_obj.sender}
                    rp_details={rp_details} 
                    loadQR={this.loadQR}                    
                />,
                qrcode: <div></div>
            });
        }
    }

    loadQR = (reg_post_id, receiver, sender) => {
        this.setState({
            confirmation: <div></div>,
            qrcode: <QRCode 
            type="RegPost" id={reg_post_id} receiver={receiver} sender={sender} />
        });
    }

    render() {
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Registered Post Record' : 'Registered Post Sevice';
        return (
            <>                
                <Poster type='Registered Post' description={descript} />
                <section className="ftco-section">
                    <div className="container">
                        {(localStorage.getItem('user_type') === 'post_office')
                            ? <div className="row justify-content-center">
                                <div className="col-xl-12">
                                    <AddressFormRP loadConfirmation={this.loadConfirmation} />
                                </div>
                                {this.state.confirmation}
                                {this.state.qrcode}
                                {/* <ConfirmRP /> */}
                                {/* <QRCode type="RegPost" id="5"/> */}
                            </div>
                            : <div className="row justify-content-center">
                                <h4 className="text-center">Registered Post Service Description</h4>
                            </div>
                        }
                    </div>
                </section>
            </>
        )
    }
}

export default RegisteredPost
