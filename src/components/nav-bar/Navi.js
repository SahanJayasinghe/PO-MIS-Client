import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

class Navi extends Component {

	constructor(props) {
		super(props)
		
		this.component_ref = React.createRef();		
	}	

	handleClick = () => {
		this.component_ref.current.toggleModal();
	}

	render() {
		return (		
			<>
				<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
					<div className="container">
						<Link className="navbar-brand" to='/'>Post Office MIS</Link>
						<div className="collapse navbar-collapse" id="ftco-nav">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
								<li className="nav-item"><a href="about.html" className="nav-link">About</a></li>							
								{
									(localStorage.getItem('user_type') === 'post_office') 
									?
									<>
									<li className="nav-item"><Link to="/qr-scan" className="nav-link">QR Scan</Link></li>
									<li className="nav-item dropdown">
										<a href="" className="nav-link dropdown-toggle" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mail Logs</a>
										<div className="dropdown-menu" aria-labelledby="dropdown04">
											<Link to='/reg-post-log' className="dropdown-item">Registered Post</Link>
											<Link to='/parcel-log' className="dropdown-item">Parcel Post</Link>
											{/* <a className="dropdown-item" href="ftc_t.html">Parcels</a> */}
											<a className="dropdown-item" href="moneyorder_t.html">Money Order</a>							
										</div>
									</li>
									<li className="nav-item"><a href="" className="nav-link" data-toggle="modal" data-target="#modalLogoutForm">Logout</a></li>
									</>
									:
									<li className="nav-item"><a href="" onClick={this.handleClick} className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Login</a></li>								
								}							
							</ul>
						</div>
					</div>
				</nav>

				<Login handleLogin={this.props.handleLogin} ref={this.component_ref} />
				<Logout handleLogout={this.props.handleLogout} />
			</>
		);
	}
    
}

export default Navi