import React, { Component } from 'react';
import Poster from '../Poster';
import AddressFormNP from './AddressFormNP';
import ConfirmNP from './ConfirmNP';
import QRCode from '../QRCode';
import np_img from '../../images/normal_post.png';

class NormalPost extends Component{

    constructor(props){
        super(props);

        this.state = {
            confirmation: <div></div>,
            qrcode: <div></div>
        }
    }

    loadQR = (address_obj) => {
        this.setState({
            confirmation: <div></div>,
            qrcode: <QRCode type="NormalPost" address={address_obj} />
        });
    }

    loadConfirmation = (address_arr, price) => {
        if (address_arr === undefined){
            this.setState({
                confirmation: <div></div>,
                qrcode: <div></div>
            });
        }
        else{
            this.setState({
                confirmation: <ConfirmNP address={address_arr} price={price} loadQR={this.loadQR} />,
                qrcode: <div></div>
            });
        }
    }

    render(){
        console.log('NormalPost Render');
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Normal Post Record' : 'Normal Post Service';
        return(
            <React.Fragment>
                <Poster type='Normal Post' description={descript} />
                <section className="ftco-section">
                    <div className="container">
                        {(localStorage.getItem('user_type') === 'post_office')
                            ? <div className="row justify-content-center">
                                <div className="col-xl-6">
                                    <AddressFormNP loadConfirmation={this.loadConfirmation} />
                                </div>
                                {this.state.confirmation}
                                {this.state.qrcode}
                            </div>
                            : <>
                                <div className="row justify-content-center">
                                    {/* <h4 className="text-center">Normal Post Service Description</h4> */}
                                    <div className="col-lg-4">
                                        <img src={np_img} style={{"width": "100%"}} alt=""></img>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="alert alert-info">
                                            <p>Commonly used postal service in Sri Lanka
                                                 which includes mostly the delivery of bills and bank reports to residents.
                                                 People can use this service to send their personal mail items
                                                 though the Department of Postal Services does not track the delivery of this post type.
                                                 Residents are recommended to use Registered Post Service instead of
                                                 Normal Post Service to send their postal items of high importance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <h6 className="font-weight-normal text-body">Residents can view the total number of normal post letters: </h6>
                                        <ul className="list-unstyled ml-4">
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                currently on-route to their address
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                successfuly delivered to their address
                                            </p></li>
                                            <li><p className="px-2 d-block text-body">
                                                <span className="font-weight-bolder mr-2 text-success">&#8594;</span>
                                                discarded by the post office due to the unavailability of the resident
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
                                                 Normal Post tab from the page.
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
        );
    }
}

export default NormalPost;