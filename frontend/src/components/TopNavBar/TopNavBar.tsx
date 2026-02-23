import React from "react";
import {Link } from 'react-router-dom';
import './TopNavBar.css';

export default function TopNavBar() {
    return (
        <nav className="navbar bg-light">
            <div className="navbar-left">
                <Link to="/" className="navbar-item">Dashboard</Link>
            </div>
            <div className="navbar-right">
                <Link to="/login" className="navbar-item">Login/Sign Up</Link>
                {/* If user is logged in, show profile and logout options instead 
                <Link to="/login" className="navbar-item">Profile</Link>
                <Link to="/login" className="navbar-item">Log Out</Link>*/}
            </div>
        </nav>
    );
}
