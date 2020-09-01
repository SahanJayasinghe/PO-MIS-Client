import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'

class ErrorModal extends Component {
    render() {
        return (
            <Modal size="md" show={this.props.show} onHide={this.props.toggleErrModal}>
                <Modal.Header>
                    <h4 className="modal-title w-100 font-weight-bold text-danger text-center">{this.props.err_type}</h4>
                    <button type="button" className="close" onClick={this.props.toggleErrModal} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center text-body font-weight-bold">{this.props.err_msg}</p>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ErrorModal
