import React, { Component } from 'react';
var QR = require('qrcode');

class QRCode extends Component{

    constructor(props){
        super(props);

        this.state = {
            data_url: null,
            filename: null
            // dlbutton: <div></div>
        }
    }

    componentDidMount(){
        const canvas = document.getElementById('qr');
        let qrData;
        let dt = new Date();
        let dt_str;
        let id;

        if(this.props.type === "NormalPost"){
            let address_arr = this.props.address;            
            let addressStr = address_arr.slice(1).join(', ');
            let date = dt.toLocaleDateString().split('/');
            let time = dt.toTimeString().split(' ');
            dt_str = `${date[2]}-${date[0]}-${date[1]} ${time[0]}`;

            id = address_arr[0];
            qrData = `type=NormalPost_id=${address_arr[0]}_DeliveryAddress=${addressStr}_PostedOn=${dt_str}`;
        }

        else if(this.props.type === "RegPost"){            
            let receiver = this.props.receiver;
            let sender = this.props.sender;

            let rec_address = receiver.slice(1).join(', ');
            let sen_address = sender.slice(1).join(', ');

            id = this.props.id;
            qrData = `type=RegPost_id=${this.props.id}_ReceiverAddress=${rec_address}_SenderAddress=${sen_address}`;
        }

        else if(this.props.type === 'Parcel'){
            let address = this.props.address;
            let rec_address = address.slice(1).join(', ');
            id = this.props.id;
            qrData = `type=Parcel_id=${this.props.id}_DeliveryAddress=${rec_address}`;
        }

        QR.toCanvas(canvas, qrData, {errorCorrectionLevel: 'M'}, (err) => {
            if (err) {
                console.log(err.message);
            }
            else{                                
                console.log('QR code generated');
            }            
        });

        // const filename = `${this.props.type}_${id} ${dt.toString()}.png`;
        this.setState({
            filename: `${this.props.type}_${id} ${dt_str.replace(/:/g,'-')}.png`,
            data_url: canvas.toDataURL()
        })
        // this.setState({
        //     dlbutton: 
        //         <div className="col-md-10">
        //             <div className="cart-detail p-3 p-md-3">
        //                 <a href={canvas.toDataURL()} className="btn btn-primary py-3 px-3" download={filename}>Download</a>
        //             </div>
        //         </div>
        // });
    }

    render(){
        const {data_url, filename} = this.state;
        return(
            <div className="col-xl-6">
                <br/>
                <div className="row justify-content-around">
                    <div className="col-sm-6">
                        <div className="row justify-content-center my-5">
                            {/* {this.state.qrImg} */}
                            <canvas id="qr" width={640} height={425}></canvas>
                            {/* {this.state.dlbutton} */}
                            {/* <div className="cart-detail p-3 p-md-4">
                                <p><button className="btn btn-primary py-3 px-4" onClick={this.qrDownload}>Download</button></p>
                            </div> */}
                        </div>
                    </div>
                    { (data_url && filename)
                        ? <div className="col-sm-6">
                            <div className="row justify-content-center">
                                {/* {this.state.dlbutton} */}
                                <div className="col-md-10 mb-3">
                                    <div className="cart-detail p-3 p-md-3">
                                        <a href={data_url} className="btn btn-primary py-3 px-3" download={filename}>Download</a>
                                    </div>
                                </div>
                                <div className="alert alert-success d-block" role="alert">
                                    <p className="d-flex my-1"> <span className="font-weight-bold mr-2"> 1. </span> Download the QR Code </p>
                                    <p className="d-flex my-1"> <span className="font-weight-bold mr-2"> 2. </span> Print the QR Code </p>
                                    <p className="d-flex my-1"> <span className="font-weight-bold mr-2"> 3. </span> Attach the QR to the cover of the postal item </p>
                                </div>                                                                                                              
                            </div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        )
    }
}

export default QRCode;