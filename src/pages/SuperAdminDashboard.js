import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ClinicsManagement from '../components/ClinicsManagement';
import AdminsManagement from '../components/AdminsManagement';
import HeaderSuperAdmin from '../components/HeaderSuperAdmin';

const SuperAdminDashboard = ({ user, setUser }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/clinics" element={<ClinicsManagement />} />
            <Route path="/admins" element={<AdminsManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
