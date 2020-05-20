import React, { Component } from 'react'

class Logout extends Component {

    handleClick = (event) => {
        localStorage.removeItem('user_type');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_token');
        
        if(localStorage.getItem('postal_area')){
            localStorage.removeItem('postal_area');
        }
        this.props.handleLogout();
    }

    render() {
        return (
            <div className="modal fade" id="modalLogoutForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">				
				<div className="modal-dialog" role="document">
					<div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Confirmation</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <div className="col-md-12 row">                                
                                <div className="col-md-6 cart-detail p-3 p-md-3">
                                    <button type="button" onClick={this.handleClick} className="btn btn-danger btn-block py-3 px-6" data-dismiss="modal">Logout</button>
                                </div>                                
                                <div className="col-md-6 cart-detail p-3 p-md-3">
                                    <button type="button" className="btn btn-dark btn-block py-3 px-6" data-dismiss="modal">Cancel</button>
                                </div>                                
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default Logout
