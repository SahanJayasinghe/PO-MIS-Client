import React, { Component } from 'react';
import Poster from '../Poster';
import AddressFormNP from './AddressFormNP';
import ConfirmNP from './ConfirmNP';
import QRCode from '../QRCode';

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
        let descript = (localStorage.getItem('user_type') === 'post_office') ? 'Create Normal Post Record' : 'Normal Post Sevice';
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
                            : <div className="row justify-content-center">
                                <h4 className="text-center">Normal Post Service Description</h4>
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
        );
    }    
}

export default NormalPost;