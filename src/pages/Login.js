import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import fakeData from '../assets/fakeData.json';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const superAdmin = fakeData.superAdmins.find(
      (user) => user.username === username && user.password === password
    );

    if (superAdmin) {
      const token = 'superadmin-token'; // Generate a token here (this should be more secure in a real app)
      Cookies.set('authToken', token, { expires: 1 }); // Save the token in a cookie with a 1-day expiration
      setUser(superAdmin);
      navigate('/superadmin-dashboard');
      return;
    }

    const clinicAdmin = fakeData.clinicUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (clinicAdmin) {
      const token = 'clinicadmin-token'; // Generate a token here
      Cookies.set('authToken', token, { expires: 1 });
      setUser(clinicAdmin);
      navigate('/home');
      return;
    }

    setError('Invalid username or password');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
