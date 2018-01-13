import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>
    <div>
        <h1 className="text-align:center">404 page not found</h1>
        <p>We are sorry but the page you are looking for does not exist.</p>
        <Link to="/">Please return to Home</Link>
    </div>

export default NotFound;