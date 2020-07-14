import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

class Navi extends Component {

	constructor(props) {
		super(props)
		this.state = {
			modal_show: false
		}
		// this.component_ref = React.createRef();
	}

	toggleModal = (event) => {
        console.log('Navi toggleModal');
        this.setState({
            modal_show: !this.state.modal_show
        });
    }

	render() {
		console.log('Navi Render');
		console.log(this.state);
		return (
			<>
				<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
					<div className="container">
						<div className="d-inline-block">
							<Link className="navbar-brand" to='/'>Post Office MIS</Link>
							{(localStorage.getItem('user_type') === 'post_office')
								? <span className="font-weight-bold text-nowrap text-capitalize ml-2">
									{`${localStorage.getItem('postal_area')}, ${localStorage.getItem('user_id')}`}
								</span>
								: <></>
							}
							{(localStorage.getItem('user_type') === 'admin')
								? <span className="font-weight-bold text-nowrap mx-2"> {`Admin - ${localStorage.getItem('user_id')}`} </span>
								: <></>
							}
						</div>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="oi oi-menu"></span>
							Menu
						</button>
						<div className="collapse navbar-collapse" id="ftco-nav">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
								<li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
								{
									(localStorage.getItem('user_type'))
									? (localStorage.getItem('user_type') === 'post_office')
										? <>
										<li key="1" className="nav-item"><Link to="/qr-scan" className="nav-link">QR Scan</Link></li>
										<li key="11" className="nav-item dropdown">
											<a href="" className="nav-link dropdown-toggle" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Money Order</a>
											<div className="dropdown-menu" aria-labelledby="dropdown03">
												<Link to='/money-order-deliver' className="dropdown-item">Deliver Money Order</Link>
												<Link to='/money-order-return' className="dropdown-item">Return Money Order</Link>
												<Link to='/money-order-log' className="dropdown-item">Money Order Log</Link>
											</div>
										</li>
										<li key="2" className="nav-item dropdown">
											<a href="" className="nav-link dropdown-toggle" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mail Logs</a>
											<div className="dropdown-menu" aria-labelledby="dropdown04">
												<Link to='/reg-post-log' className="dropdown-item">Registered Post</Link>
												<Link to='/parcel-log' className="dropdown-item">Parcel Post</Link>
											</div>
										</li>
										<li key="3" className="nav-item"><a href="" className="nav-link" data-toggle="modal" data-target="#modalLogoutForm">Logout</a></li>
										</>
										: <>
										<li key="4" className="nav-item dropdown">
											<a href="" className="nav-link dropdown-toggle" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Address</a>
											<div className="dropdown-menu" aria-labelledby="dropdown05">
												<Link to='/address-log' className="dropdown-item">Address Log</Link>
												<Link to='/address' className="dropdown-item">Create Address</Link>
											</div>
										</li>
										<li key="6" className="nav-item dropdown">
											<a href="" className="nav-link dropdown-toggle" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Postal Area</a>
											<div className="dropdown-menu" aria-labelledby="dropdown06">
												<Link to='/postal-area-log' className="dropdown-item">Postal Area Log</Link>
												<Link to='/postal-area' className="dropdown-item">Create Postal Area</Link>
												<Link to='/postal-account' className="dropdown-item">Create Postal Account</Link>
											</div>
										</li>
										<li key="7" className="nav-item"><a href="" className="nav-link" data-toggle="modal" data-target="#modalLogoutForm">Logout</a></li>
										</>
									: <>
										<li key="8" className="nav-item"><Link to='/resident' className="nav-link">Your Mail</Link></li>
										<li key="9" className="nav-item"><a href="" onClick={this.toggleModal} className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Login</a></li>
									</>
								}
							</ul>
						</div>
					</div>
				</nav>
				{(localStorage.getItem('user_type'))
					? <Logout handleLogout={this.props.handleLogout} />
					: <Login handleLogin={this.props.handleLogin} show={this.state.modal_show} toggle={this.toggleModal} />
				}
			</>
		);
	}

}

export default Navi