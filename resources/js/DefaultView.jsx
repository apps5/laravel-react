import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';

const DefaultView = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('authToken')
    );

    const handleLogin = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <Routes>

            {/* Public Route: Home Page */}
            <Route path="/" element={<Home />} />

            {/* Public Route: Login Page */}
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />
                }
            />

            {/* Registration is open to unauthenticated users */}
            <Route
                path="/register"
                element={
                    isAuthenticated ? <Navigate to="/" /> : <Register />
                }
            />

            {/* Protected Route: Admin Panel */}
            <Route
                path="/admin"
                element={
                    isAuthenticated ? (
                        <AdminPanel onLogout={handleLogout} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

        </Routes>
    );
};

export default DefaultView;
