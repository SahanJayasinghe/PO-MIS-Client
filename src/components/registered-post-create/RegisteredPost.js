import React, { Component } from 'react'
import AddressFormRP from './AddressFormRP'
import ConfirmRP from './ConfirmRP'
import QRCode from '../QRCode'
import Poster from '../Poster'
import rp_img from '../../images/registered_post.png'

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
        const bg_style = {
            backgroundImage: `url(${rp_img})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Registered Post Record' : 'Registered Post Service';
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
                            : <>
                                <div className="row justify-content-center">
                                    {/* <h4 className="text-center">Registered Post Service Description</h4> */}
                                    <div className="col-lg-4">
                                        <img src={rp_img} style={{"width": "100%"}} alt=""></img>
                                        {/* <div className="h-100" style={bg_style}></div> */}
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="alert alert-info">
                                            <p>Official applications, reports and personal letter items of high impotance and value
                                                are managed through this postal service. The Department of Postal Services track
                                                all the registered posts through out the delivery process and gurantee the delivery or return
                                                of these postal items. The computarized system helps track the posts by recording the
                                                route information at intermediate post offices with the help of the QR Code attached to posts.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <h6 className="font-weight-normal text-body">Residents can view the details about:</h6>
                                        <ul className="list-unstyled ml-4">
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                Receiving registered posts still on-route with current location
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                Registered posts successfuly delivered
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                Registered posts returned back to sender due to the unavailability of the resident
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                Details about the registered posts sent from your address
                                            </p></li>
                                        </ul>
                                        <p className="ml-2 text-body">By following the steps listed below.</p>
                                        <ul className="list-unstyled ml-4">
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">1.</span>
                                                Click on the 'Your Mail' link at the navigation bar or
                                                 click on the button 'Your Mail Log' at the middle of the home page.
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">2.</span>
                                                Enter the house number and select your postal area.
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">3.</span>
                                                Enter the secret key of your address.
                                                 (If you don't have it, please go to your post office
                                                 and inform the post master to request the secret key.)
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">4.</span>
                                                You can view the above mentioned details by selecting
                                                 Registerd Post tab from the page.
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">5.</span>
                                                Switch between Received and Sent Registered Posts tabs view relevant records
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bold mr-2 text-info">6.</span>
                                                Refer the tables which categorizes the postal records depending on whether
                                                 a postal item is currently on-route, delivered, returned or discarded
                                            </p></li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </section>
            </>
        )
    }
}

export default RegisteredPost
