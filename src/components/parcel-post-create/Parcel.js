import React, { Component } from 'react'
import ConfirmParcel from './ConfirmParcel';
// import Navi from '../nav-bar/Navi';
import AddressFormParcel from './AddressFormParcel';
import QRCode from '../QRCode';
import Poster from '../Poster';
import parcel_img from '../../images/parcel_post.png'

class Parcel extends Component {
    constructor(props){
        super(props);

        this.state = {
            confirmation: <div></div>,
            qrcode: <div></div>
        }
    }

    loadQR = (parcel_id, address_arr) => {
        this.setState({
            confirmation: <div></div>,
            qrcode: <QRCode type="Parcel" id={parcel_id} address={address_arr} />
        });
    }

    loadConfirmation = (address_arr, receiver_name, payment, descript) => {
        if (address_arr === undefined){
            this.setState({
                confirmation: <div></div>,
                qrcode: <div></div>
            });
        }
        else{
            this.setState({
                confirmation:
                    <ConfirmParcel
                        receiver_name={receiver_name}
                        address={address_arr}
                        payment={payment}
                        descript={descript}
                        loadQR={this.loadQR}
                    />,
                qrcode: <div></div>
            });
        }
    }

    render() {
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Parcel Post Record' : 'Parcel Post Service';
        return (
            <React.Fragment>
                {/* <UpperLine /> */}
                {/* <Navi /> */}
                <Poster type='Parcel Post' description={descript} />
                <section className="ftco-section">
                    <div className="container">
                    {(localStorage.getItem('user_type') === 'post_office')
                        ? <div className="row justify-content-center">
                            <div className="col-xl-6">
                                <AddressFormParcel loadConfirmation={this.loadConfirmation} />
                            </div>
                            {this.state.confirmation}
                            {this.state.qrcode}
                        </div>
                        : <>
                            <div className="row justify-content-center">
                                {/* <h4 className="text-center">Parcel Post Service Description</h4> */}
                                <div className="col-lg-4">
                                        <img src={parcel_img} style={{"width": "100%"}} alt=""></img>                                        
                                </div>
                                <div className="col-lg-8">
                                    <div className="alert alert-info">
                                        <p>Local and internation parcel items are managed and local deliveries
                                             are tracked by the Department of Postal Services. Locally posted parcels
                                             which needs to be returned upon the unavailablity of the receiving party
                                             should be registered. Route of a parcel to its destination is recorded at
                                             the intermediate post offices with the help of the attached QR Code.
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
                                            Parcels currently on-route to their address
                                        </p></li>
                                        <li><p className="px-2 d-block text-body">
                                            <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                            Successfully delivered parcels
                                        </p></li>
                                        <li><p className="px-2 d-block text-body">
                                            <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                            Parcels discarded by the post office due to the unavailability of the resident
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
                                             Parcel Post tab from the page.
                                        </p></li>
                                        <li><p className="px-2 d-block text-body">
                                            <span className="font-weight-bold mr-2 text-info">5.</span>
                                            Refer the tables which categorizes the postal records depending on whether
                                             a postal item is currently on-route, delivered or discarded
                                        </p></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    }
                    </div>
                </section>
                {/* <section className="ftco-section">
                    <div className="container">
                        {this.state.qrcode}
                    </div>
                </section> */}
            </React.Fragment>
        )
    }
}

export default Parcel