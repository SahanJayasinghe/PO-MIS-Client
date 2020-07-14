import React from 'react';
import { Link } from 'react-router-dom';
import postimg from '../images/sl_post_new_1.png';
import rpimg from '../images/6.png';
import npimg from '../images/5.jpg';
import parcelimg from '../images/4.png';
import moimg from '../images/3.jpg';

function Body(){

	const img = {
		backgroundImage: `url(${postimg})`
	};

	const regpost = {
		backgroundImage: `url(${rpimg})`
	};
	const npost = {
		backgroundImage: `url(${npimg})`
	};
	const parcel = {
		backgroundImage: `url(${parcelimg})`
	};
	const moneyord = {
		backgroundImage: `url(${moimg})`
	}

    return(
        <React.Fragment>
			<section id="home-section" className="hero">
				<div className="col-md-12">
					<div className="row justify-content-center">

						<img src={postimg} alt=""></img>
				{/* <div className="hero-wrap hero-bread" style={img}> */}
					{/* <div className="container">
					<div className="row no-gutters slider-text align-items-center justify-content-center">
						<div className="col-md-9  text-center">
						{/* <h1 className="mb-0 bread">Sri Lanka Postal Services</h1>
						</div>
					</div>
					</div> */}
					</div>
				</div>
			</section>
			<section className="ftco-section ftco-category ftco-no-pt">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-6 order-md-last align-items-stretch d-flex">
									<div className="category-wrap-2 img align-self-stretch d-flex">
										<div className="text text-center">
											<h2>Effiecient Postal Service</h2>
											<p>For the betterment of every home</p>
											<div className="cart-detail p-3 p-md-3">
												<p><Link to='/normal-post' className="btn btn-primary py-2 px-4">Normal Post</Link></p>
												<p><Link to='/registered-post' className="btn btn-primary py-2 px-4">Registered Post</Link></p>
												<p><Link to='/parcel-post' className="btn btn-primary py-2 px-4">Parcel Delivery</Link></p>
												<p><Link to='/money-order' className="btn btn-primary py-2 px-4">Money Order</Link></p>
												{/* <p><a href="morder.html" className="btn btn-primary py-2 px-4">Money Order</a></p> */}
											</div>
											{
												(!localStorage.getItem('user_type'))
												? <div className="cart-detail p-3 p-md-3">
													<p className="mt-4">
														<Link to='/resident' className="btn btn-dark py-3 px-5">Your Mail Log</Link>
													</p>
												</div>
												: <></>
											}
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="category-wrap  img mb-4 d-flex align-items-end" style={regpost}>
										{/* <div className="text px-3 py-1">
											<h2 className="mb-0"><Link to='/registered-post' className="py-2 px-4">Registered Post</Link></h2>
										</div> */}
									</div>
									<div className="category-wrap  img d-flex align-items-end" style={npost}>
										{/* <div className="text px-3 py-1">
											<h2 className="mb-0"><Link to='/normal-post' className="py-2 px-4">Normal Post</Link></h2>
										</div> */}
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="category-wrap  img mb-4 d-flex align-items-end" style={parcel}>
								{/* <div className="text px-3 py-1">
									<h2 className="mb-0"><Link to='/parcel-post' className="py-2 px-4">Parcel Delivery</Link></h2>
								</div>		 */}
							</div>
							<div className="category-wrap  img d-flex align-items-end" style={moneyord}>
								{/* <div className="text px-3 py-1">
									<h2 className="mb-0"><Link to='/money-order' className="py-2 px-4">Money Order</Link></h2>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
    );
}

export default Body;