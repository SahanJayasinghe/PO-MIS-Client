import React from 'react'
import { Link } from 'react-router-dom';
import '../custom_styles/not_found_page_style.css'

function NotFoundPage() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404 mb-4">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link to='/' className="notfound-link text-light">Go To Homepage</Link>
                {/* <a href="#">Go To Homepage</a> */}
            </div>
        </div>
    )
}

export default NotFoundPage
