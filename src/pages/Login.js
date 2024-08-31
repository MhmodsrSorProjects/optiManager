import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useUser } from '../UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser(); // Get setUser from the context
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Fetch superAdmins and clinicUsers data from json-server
      const [superAdminsResponse, clinicUsersResponse] = await Promise.all([
        axios.get('http://localhost:3000/superAdmins'),
        axios.get('http://localhost:3000/clinicUsers')
      ]);

      const superAdmins = superAdminsResponse.data;
      const clinicUsers = clinicUsersResponse.data;

      // Find the super admin in the fetched data
      const superAdmin = superAdmins.find(
        (user) => user.username === username && user.password === password
      );

      if (superAdmin) {
        const token = 'superadmin-token'; // Simulate token generation
        Cookies.set('authToken', token, { expires: 1 }); // Save token in cookies
        localStorage.setItem('user', JSON.stringify(superAdmin)); // Store user in localStorage
        setUser(superAdmin); // Update user state
        navigate('/superadmin-dashboard'); // Navigate to super admin dashboard
        return;
      }

      // Find the clinic admin in the fetched data
      const clinicAdmin = clinicUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (clinicAdmin) {
        const token = 'clinicadmin-token'; // Simulate token generation
        Cookies.set('authToken', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(clinicAdmin)); // Store user in localStorage
        setUser(clinicAdmin); // Set the logged-in user state
        navigate('/home'); // Navigate to home page
        return;
      }

      setError('Invalid username or password'); // Show error if credentials are invalid
    } catch (err) {
      setError('An error occurred while logging in. Please try again.'); // Error handling for network issues
      console.error('Login error:', err); // Log the error to console for debugging
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
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
