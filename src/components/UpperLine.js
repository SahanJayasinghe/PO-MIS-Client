import React from 'react';
// import './Mys.css';

function UpperLine(){
    return(
        <div>
		<div className="py-1 bg-primary">
    	<div className="container">
    		<div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
	    		<div className="col-lg-12 d-block">
		    		<div className="row d-flex justify-content-around">
		    			<div className="col-md pr-4 d-flex topper align-items-center">
					    	<div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-navigation"></span></div>
						    <span className="text">mail tracking</span>
					    </div>
					    <div className="col-md pr-4 d-flex topper align-items-center">
					    	<div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-database"></span></div>
						    <span className="text">postal data storage</span>
					    </div>
					    <div className="col-md pr-4 d-flex topper align-items-center">
							<div className="icon mr-2 d-flex align-items-right"><span className="icon-paper-plane"></span></div>
						    <span className="text">delivery management</span>
					    </div>
				    </div>
			    </div>
		    </div>
		  </div>
    	</div>
        </div>
    );
}

export default UpperLine;