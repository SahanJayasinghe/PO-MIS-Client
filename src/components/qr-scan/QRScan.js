import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class QRScan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show_scanner: false,
            ClickFn: this.loadScanner,
            btnName: 'Scan QR Code',
            result: null
        }
    }

    loadScanner = (event) => {
        this.setState(
            {
                show_scanner: true,
                ClickFn: this.closeScanner,
                btnName: 'Close Scanner'
            }
        );
    }

    closeScanner = (event) => {
        this.setState({
            show_scanner: false,
            ClickFn: this.loadScanner,
            btnName: 'Scan QR Code'
        })
    }

    handleScan = data => {
        if (data) {
            this.setState({
                show_scanner: false,
                ClickFn: this.loadScanner,
                btnName: 'Scan QR Code',
                result: data
            });
            console.log(`QR Content: ${data}`);
            let qr_content = data.split('_');
            if(qr_content.length === 1){
                this.props.getScanResults(null, null);
                alert('Invalid QR Code');
            }
            else{
                let type_content = qr_content[0].split('=');
                let id_content = qr_content[1].split('=');
                if(type_content.length === 2 && id_content.length === 2 && type_content[0] === 'type' && id_content[0] === 'id'){
                    let type = type_content[1];
                    let id = id_content[1];
                    if (['NormalPost', 'RegPost', 'Parcel'].includes(type)){
                        this.props.getScanResults(type, id);
                    }
                    else{
                        this.props.getScanResults(null, null);
                        alert('Invalid QR Code');
                    }

                }
                else{
                    this.props.getScanResults(null, null);
                    alert('Invalid QR Code');
                }
            }
        }
    }

    handleError = err => {
        console.error(err)
    }

    render() {
        let div_style = {
            backgroundColor: "#7ebce1",
            height: "250px",
            border: "15px solid",
            borderStyle: 'groove',
            borderColor: "#3f6cbf",
            padding: "50px",
            margin: "20px"
        }
        return (
            <div className="col-md-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="cart-detail p-3 p-md-3">
                            <p><button onClick={this.state.ClickFn} className="btn btn-primary py-3 px-4">{this.state.btnName}</button></p>
                        </div>
                    </div>
                </div>
                {
                    (this.state.show_scanner) ?
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <QrReader
                                    delay={300}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    : <div className="row align-items-center justify-content-center" style={div_style}>
                        <span className="text-dark">Scanning Area</span>
                    </div>
                }
                {/* <div className="row justify-content-center">
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '25%', height: '25%' }}
                    />
                    <p>{this.state.result}</p>
                </div> */}
                {/* <div className="row justify-content-center mt-3">
                    <p className="d-flex text-center">{this.state.result}</p>
                </div> */}
            </div>
        )
    }
}

export default QRScan