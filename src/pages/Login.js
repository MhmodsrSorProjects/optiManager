import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useUser } from '../UserContext';

const Login = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      // Assuming the backend returns user data on successful login
      const user = response.data.user;

      const token = `${user.role}-token`;
      Cookies.set('authToken', token, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate(user.role === 'superadmin' ? '/superadmin-dashboard' : '/home');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/3c/16/6d/3c166df34a65611cbfbd28bff3644043.gif')"
      }}
    >
      <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-md p-8 rounded shadow-md w-full max-w-md">
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
