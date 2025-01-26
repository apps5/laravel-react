import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    AppNotifications
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">


                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                              PublicPage
                            </Link>
                        </li>
                        {!onLogout && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                        {onLogout && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger nav-link text-white"
                                    onClick={onLogout}
                                    style={{ border: 'none' }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;