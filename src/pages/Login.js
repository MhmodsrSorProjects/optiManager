import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple email and password validation
        if (email === 'k11111t12@gmail.com' && password === '1') {
            setIsAuthenticated(true); // Set authentication status to true
        } else {
            alert('Invalid email or password');
            setIsAuthenticated(false); // Reset authentication status
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className=' flex flex-col text-center items-center mb-10'>
                    <a href="/" className=" items-center">
                        <span className="self-center text-5xl  font-bold whitespace-nowrap dark:text-white">OptiManager</span>
                    </a>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                {isAuthenticated && (
                    <div className="mt-4">
                        <Link to="/" className="text-green-500 hover:underline font-bold text-3xl">
                            Go to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;