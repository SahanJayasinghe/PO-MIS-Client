import React, { Component } from 'react';
var QR = require('qrcode');

class QRCode extends Component{

    constructor(props){
        super(props);

        this.state = {
            dlbutton: <div></div>
        }
    }

    componentDidMount(){
        const canvas = document.getElementById('qr');
        let qrData;
        let dt = new Date();
        let dt_str;

        if(this.props.type === "NormalPost"){
            let address_arr = this.props.address;
            // let address_obj = {
            //     id: '1',
            //     house_number: '28/B',
            //     street: 'Wawahena watta',
            //     sub_area: 'hiriwala',
            //     postal_area: 'kal-eliya',
            //     postal_code: '11160'
            // };
            let addressStr = address_arr.slice(1).join(', ');
            // dt = new Date();
            let date = dt.toLocaleDateString().split('/');
            let time = dt.toTimeString().split(' ');
            dt_str = `${date[2]}-${date[0]}-${date[1]} ${time[0]}`;

            qrData = `type=NormalPost_id=${address_arr[0]}_DeliveryAddress=${addressStr}_PostedOn=${dt_str}`;
        }

        else if(this.props.type === "RegPost"){
            // let receiver = {
            //     id: '1',
            //     house_number: '28/B',
            //     street: 'Wawahena watta',
            //     sub_area: 'hiriwala',
            //     postal_area: 'kal-eliya',
            //     postal_code: '11160'
            // }
            // let sender = {
            //     id: '2',
            //     house_number: '14',
            //     street: 'Park Avenue',
            //     sub_area: 'Old Town',
            //     postal_area: 'galle',
            //     postal_code: '80000'
            // }
            let receiver = this.props.receiver;
            let sender = this.props.sender;

            let rec_address = receiver.slice(1).join(', ');
            let sen_address = sender.slice(1).join(', ');

            qrData = `type=RegPost_id=${this.props.id}_ReceiverAddress=${rec_address}_SenderAddress=${sen_address}`;
        }

        else if(this.props.type === 'Parcel'){
            let address = this.props.address;
            let rec_address = address.slice(1).join(', ');
            qrData = `type=Parcel_id=${this.props.id}_DeliveryAddress=${rec_address}`;
        }

        QR.toCanvas(canvas, qrData, {errorCorrectionLevel: 'M'}, (err) => {
            if (err) {
                console.log(err.message);
            }
            else{
                // this.setState({
                //     qrImg: 
                //         <>
                //         <img src={url} alt="qr code" /> 
                //         <div className="cart-detail p-3 p-md-4">
                //             <p><a href={url} className="btn btn-primary py-3 px-4" download>Download</a></p>
                //         </div>
                //         </>
                // });                
                console.log('QR code generated');
            }            
        });

        const filename = `${this.props.type} ${dt.toString()}.png`;
        this.setState({
            dlbutton: 
                <div className="col-md-10">
                    <div className="cart-detail p-3 p-md-3">
                        <a href={canvas.toDataURL()} className="btn btn-primary py-3 px-3" download={filename}>Download</a>
                    </div>
                </div>
        });
    }

    render(){
        return(
            <div className="col-xl-6">
                <br/>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="row justify-content-left">
                            {/* {this.state.qrImg} */}
                            <canvas id="qr" width={640} height={425}></canvas>
                            {/* {this.state.dlbutton} */}
                            {/* <div className="cart-detail p-3 p-md-4">
                                <p><button className="btn btn-primary py-3 px-4" onClick={this.qrDownload}>Download</button></p>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="row justify-content-left">
                            {this.state.dlbutton}
                            <p className="d-flex"> <span>1. Download the QR Code</span> </p>
                            <p className="d-flex"> <span>2. Print the QR Code</span> </p>
                            <p className="d-flex"> <span>3. Attach the printed QR to the cover of the letter</span> </p>                                                                                                              
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QRCode;