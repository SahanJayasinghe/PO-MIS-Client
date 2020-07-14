import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import jsQR from "jsqr";

class QRUpload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            img_data_uri: null,
            img_name: null
        }
    }

    onDrop = (files) => {
        // console.log(files[0]);
        this.setState({
            img_data_uri:  URL.createObjectURL(files[0]),
            img_name: files[0].name
        });

    }

    imgLoad = ({target:img}) => {
        // console.log(img);
        console.log(img.offsetHeight);
        console.log(img.offsetWidth);
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        // var img = document.getElementById('myimg');
        canvas.width = img.offsetWidth;
        canvas.height = img.offsetHeight;
        context.drawImage(img, 0, 0 );
        let ImgData = context.getImageData(0, 0, img.width, img.height);
        let qr_code = jsQR(ImgData.data, img.offsetWidth, img.offsetHeight);
        if(qr_code){
            console.log(qr_code);
            let qr_content = qr_code.data.split('_');
            console.log(qr_content);
            if(qr_content === undefined){
                alert('Invalid QR Code');
            }
            else if((qr_content[0].split('=')[0] === 'type') && (qr_content[1].split('=')[0] === 'id')){
                console.log(qr_content[1]);
            }
            else{
                alert('Invalid QR Code');
            }
        }
        else{
            alert('Image does not contain a QR Code');
        }
    }

    handleChange = (event) => {
        this.setState({
            img_data_uri: URL.createObjectURL(event.target.files[0]),
            img_name: event.target.files[0].name
        });
    }

    render() {
        // const files = this.state.files.map(file => (
        //     <li key={file.name}>
        //         {file.name} - {file.size} bytes
        //     </li>
        // ));

        const baseStyle = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#b6bdd0',
            color: '#4a5266',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border .24s ease-in-out'
          };

        return (
            <section className="ftco-section">
                <div className="container cart-detail p-3 p-md-4">
                    <h4 className="mb-4 billing-heading">Insert the QR Code image of the postal item</h4>
                    <div className="row justify-content-center">
                        <Dropzone onDropAccepted={this.onDrop} accept='image/jpeg, image/png' multiple={false}>
                            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})} style={baseStyle}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && <p>Drag 'n' Drop QR Code here, or Click to select file</p>}
                                    {isDragActive && !isDragReject && <p className="text-success mt-2">"Drop it right there..."</p>}
                                    {isDragReject && <p className="text-danger mt-2">"File type not accepted !!!"</p>}
                                </div>
                            </section>
                            )}
                        </Dropzone>
                    </div>
                    {/* <div className="row justify-content-center">
                        <input type="file" onChange={this.handleChange}/>
                    </div> */}
                    {
                        (this.state.img_name) ?
                            <>
                            <br />
                            <div className="row justify-content-center">
                                <img onLoad={this.imgLoad} src={this.state.img_data_uri} alt="img-preview"/>
                            </div>
                            <div className="row justify-content-center">
                                <p className="text-primary font-italic">{this.state.img_name}</p>
                            </div>
                            </>
                            : <></>
                    }
                </div>
            </section>
        )
    }
}

export default QRUpload
