import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../images/12.jpg';

function Poster(props){
    const back_image = {
        backgroundImage: `url(${bg})`
    };
    
    return(
        <React.Fragment>
            <div className="hero-wrap hero-bread" style={back_image}>
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <p className="breadcrumbs"><span className="mr-2"><Link to = "/">Home /</Link></span> <span>{props.type}</span></p>
                            <h1 className="mb-0 bread">{props.description}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Poster;