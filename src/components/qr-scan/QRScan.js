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

            let qr_content = data.split('_');
            if(qr_content === undefined){
                this.props.getScanResults(null, null, false);
                alert('Invalid QR Code');
            }            
            else{
                let content1 = qr_content[0].split('=');
                let content2 = qr_content[1].split('=');
                if(content1[0] === 'type' && content2[0] === 'id'){
                    let type = content1[1];
                    let id = content2[1];
                    this.props.getScanResults(type, id, true);
                }
                else{
                    this.props.getScanResults(null, null, false);
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
                <p className="text-center">{this.state.result}</p>
            </div>                
        )
    }
}

export default QRScan