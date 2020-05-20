import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import {handleRequestError} from '../../helpers/error_handler';

class Login extends Component {

    constructor(props) {
        super(props)
        console.log('Login constructor');
        // this.input_ref = React.createRef();

        this.state = {
            modal_show: false,
            postal_code: '',
            password: ''
        }
    }
    
    toggleModal = () =>{
        console.log('Login toggleModal');
        this.setState({
            modal_show: !this.state.modal_show
        })
    }

    handleInput = (event) => {
        this.setState(
            {            
                [event.target.name]: event.target.value
            },
            () => {
                // console.log(this.state);
            }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.modal_ref.current);
        // this.modal_ref.current.style.display = "none";
        // let backdrop = document.getElementsByClassName("modal-backdrop fade show")[0];
        // console.log(backdrop);
        // backdrop.style.display = "none";
        this.toggleModal();
        let post_obj = {
            code: this.state.postal_code,
            password: this.state.password
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/post-offices/login',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);                    
                localStorage.setItem('user_token', res.data.token);
                localStorage.setItem('user_type', 'post_office');
                localStorage.setItem('user_id', this.state.postal_code);
                localStorage.setItem('postal_area', res.data.postal_area);
                this.props.handleLogin('post_office', this.state.postal_code);
            })
            .catch(err => {
                console.log(err);              
                handleRequestError(err);
            })
    }
    
    render() {
        console.log('Login render');
        return (
            // <div className="modal fade" ref={this.modal_ref} id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">				
            <Modal show={this.state.modal_show} onHide={this.toggleModal}>
                <form onSubmit={this.handleSubmit} className="billing-form">
                    {/* <div className="modal-header text-center"> */}
                    <Modal.Header>
                        <h4 className="modal-title w-100 font-weight-bold text-center">Post Office Login</h4>
                        <button type="button" className="close" onClick={this.toggleModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    {/* </div> */}
                    <Modal.Body>
                    {/* <div className="modal-body mx-3"> */}
                        <div className="row justify-content-center">
                            <div className="col-md-10 md-form mb-5">
                                {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                                <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Post Office Code</label>
                                <input type="text" name="postal_code" onChange={this.handleInput} className="form-control validate" required/>								
                            </div>
                            <div className="col-md-10 md-form mb-4">
                                {/* <i className="fas fa-lock prefix grey-text"></i> */}
                                <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Password</label>
                                <input type="password" name="password" onChange={this.handleInput} className="form-control validate" required/>
                                {/* <i className="icon-eye"></i> */}
                            </div>
                        </div>
                    </Modal.Body>
                    {/* </div> */}
                    <Modal.Footer>
                        <div className="modal-footer cart-detail p-3 p-md-3 justify-content-center">                                    
                            <button type="submit" className="btn btn-primary py-3 px-3">Login</button>                                    
                        </div>
                    </Modal.Footer>
                </form>					
            </Modal>
			// </div>
        )
    }
}

export default Login
