import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 font-bold text-xl">Super Admin Dashboard</div>
      <ul>
        <li className={`${location.pathname === '/superadmin-dashboard/clinics' ? 'bg-gray-700' : ''} p-4`}>
          <Link to="/superadmin-dashboard/clinics">Manage Clinics</Link>
        </li>
        <li className={`${location.pathname === '/superadmin-dashboard/admins' ? 'bg-gray-700' : ''} p-4`}>
          <Link to="/superadmin-dashboard/admins">Manage Clinic Admins</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
