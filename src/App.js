import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Header from './components/Header';
import NewExamination from './components/NewExamination';
import NewPatient from './pages/NewPatient';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/new-examination/:patientId" element={<NewExamination />} />
          <Route path="/new-patient" element={<NewPatient />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
