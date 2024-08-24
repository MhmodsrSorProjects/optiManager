import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './pages/Home';
import NewExamination from './components/NewExamination';
import Header from './components/Header';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      if (token === 'superadmin-token') {
        // Set the super admin user here based on your logic
        const superAdmin = { username: 'superadmin', role: 'superadmin' }; // Complete the object
        setUser(superAdmin);
      } else if (token === 'clinicadmin-token') {
        // Set the clinic admin user here based on your logic
        const clinicAdmin = { username: 'clinicadmin', role: 'clinicadmin', clinic: { name: 'Clinic One' } }; // Complete the object
        setUser(clinicAdmin);
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {user && <Header user={user} setUser={setUser} />}
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/superadmin-dashboard/*" element={<SuperAdminDashboard user={user} setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-examination/:id" element={<NewExamination />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
