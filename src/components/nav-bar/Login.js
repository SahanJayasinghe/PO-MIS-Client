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
            postal_code: '',
            post_office_pw: '',
            username: '',
            admin_pw: ''
        }
    }

    handleInput = (event) => {
        this.setState({            
            [event.target.name]: event.target.value
        });
    }

    handlePOSubmit = (event) => {
        event.preventDefault();        
        console.log(this.state);
        let post_obj = {
            code: this.state.postal_code,
            password: this.state.post_office_pw
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
                this.setState({
                    postal_code: '',
                    post_office_pw: '',
                    username: '',
                    admin_pw: ''
                });
                this.props.toggle();
                this.props.handleLogin('post_office', this.state.postal_code);
            })
            .catch(err => {
                console.log(err);              
                handleRequestError(err);
            })
    }

    handleAdminSubmit = (event) => {
        event.preventDefault();        
        console.log(this.state);
        let post_obj = {
            username: this.state.username,
            password: this.state.admin_pw
        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/admins/login',
            data: post_obj,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(res => {
                console.log(res);                    
                localStorage.setItem('user_token', res.data.token);
                localStorage.setItem('user_type', 'admin');
                // localStorage.setItem('user_id', this.state.postal_code);
                localStorage.setItem('user_id', res.data.username);
                this.setState({
                    postal_code: '',
                    post_office_pw: '',
                    username: '',
                    admin_pw: ''
                });
                this.props.toggle();
                this.props.handleLogin('admin', res.data.username);
            })
            .catch(err => {
                console.log(err);              
                handleRequestError(err);
            })
    }
    
    render() {
        console.log('Login render');
        const {postal_code, post_office_pw, username, admin_pw} = this.state;

        return (
            // <div className="modal fade" ref={this.modal_ref} id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">				
            <Modal show={this.props.show} onHide={this.props.toggle}>                
                {/* <div className="modal-header text-center"> */}
                <Modal.Header>                    
                    <div className="d-inline-block w-100">
                        <button type="button" className="close" onClick={this.props.toggle} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <ul className="nav nav-tabs nav-justified" role="tablist">
                            <li className="nav-item"><a className="nav-link text-success active" data-toggle="tab" href="#post_office">Post Office</a></li>
                            <li className="nav-item"><a className="nav-link text-info" data-toggle="tab" role="tab" href="#admin">Admin</a></li>                    
                        </ul>                        
                    </div>              
                </Modal.Header>
                {/* </div> */}
                <Modal.Body>
                {/* <div className="modal-body mx-3"> */}                   
                    <div className="tab-content">
                        <div id="post_office" className="tab-pane show active" role="tabpanel">
                            <form onSubmit={this.handlePOSubmit} className="billing-form">
                                <div className="alert alert-success" role="alert">
                                    <h4 className="w-100 text-center">Post Office Login</h4>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 mb-3">
                                        {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                                        <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Post Office Code</label>
                                        <input type="text" name="postal_code" 
                                            value={postal_code} onChange={this.handleInput} 
                                            className="form-control validate" placeholder="Enter Code..." 
                                            minLength="1" maxLength="25" required
                                        />								
                                    </div>
                                    <div className="col-md-10 mb-3">
                                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                                        <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Password</label>
                                        <input type="password" name="post_office_pw"
                                            value={post_office_pw} onChange={this.handleInput}
                                            className="form-control validate" placeholder="Enter Password..."
                                            minLength="1" maxLength="25" required                                
                                        />
                                        {/* <i className="icon-eye"></i> */}
                                    </div>
                                    <div className="col-md-10 my-3">
                                        <div className="cart-detail p-3 p-md-3">                                    
                                            <button type="submit" className="btn btn-primary w-100 py-3 px-3">Login</button>                                    
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="admin" className="tab-pane fade" role="tabpanel">
                            <form onSubmit={this.handleAdminSubmit} className="billing-form">
                                <div className="alert alert-info" role="alert">
                                    <h4 className="w-100 text-center">Admin Login</h4>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 mb-3">
                                        {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                                        <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Username</label>
                                        <input type="text" name="username" 
                                            value={username} onChange={this.handleInput} 
                                            className="form-control validate" placeholder="Enter Username..." 
                                            minLength="1" maxLength="50" required
                                        />								
                                    </div>
                                    <div className="col-md-10 mb-3">
                                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                                        <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Password</label>
                                        <input type="password" name="admin_pw"
                                            value={admin_pw} onChange={this.handleInput} 
                                            className="form-control validate" placeholder="Enter Password..." 
                                            minLength="1" maxLength="25" required
                                        />
                                        {/* <i className="icon-eye"></i> */}
                                    </div>
                                    <div className="col-md-10 my-3">
                                        <div className="cart-detail p-3 p-md-3">                                    
                                            <button type="submit" className="btn btn-info w-100 py-3 px-3">Login</button>                                    
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                {/* </div> */}                					
            </Modal>
			// </div>
        )
    }
}

export default Login
