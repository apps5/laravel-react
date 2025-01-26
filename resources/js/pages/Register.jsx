import React, { useState } from 'react';
import { register } from '../axiosService';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [user, setUser] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const userData = await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setUser(userData.user);
            alert('Registration successful');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const messages = Object.values(error.response.data.errors).flat();
                alert(messages.join('\n'));
            } else {
                alert('Registration failed');
            }
        }

    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h2 className="card-title text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordConfirmation" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;