import React from 'react';
import { useLocation } from 'react-router-dom';

const ClinicAdminDashboard = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
      <h2 className="text-2xl mb-4">Clinic: {user.clinic.name}</h2>
      <ul className="list-disc list-inside">
        {user.clinic.patients.map((patient) => (
          <li key={patient.id}>{patient.patientName} - {patient.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicAdminDashboard;
