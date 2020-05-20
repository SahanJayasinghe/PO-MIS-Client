import React, { Component } from 'react'
import ConfirmParcel from './ConfirmParcel';
import Navi from '../nav-bar/Navi';
import AddressFormParcel from './AddressFormParcel';
import QRCode from '../QRCode';
import Poster from '../Poster';

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
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Parcel Post Record' : 'Parcel Post Sevice';
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
                        : <div className="row justify-content-center">
                            <h4 className="text-center">Parcel Post Service Description</h4>
                        </div>
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